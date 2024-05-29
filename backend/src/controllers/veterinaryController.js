const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Veterinary = require('../models/veterinaryModel');
const Token = require('../models/tokenModel');
const { envoyerVerification } = require('../utils/sendEmail');
const crypto = require('crypto');
const VeterinaryAvailability=require('../models/availabilityModel')

// Function to register a new veterinarian
const registerVeterinary = asyncHandler(async (req, res) => {
    const { fullname, email, specialite, address, nomCabinet, datebirth, phoneNumber, password, confirmpassword, role } = req.body;

    // Vérification des champs requis
    if (!fullname || !email || !specialite || !address || !nomCabinet || !datebirth || !phoneNumber || !password || !confirmpassword || !role) {
        res.status(400).json({ message: 'Veuillez remplir tous les champs.' });
        return;
    }

    // Destructuration de l'objet address
    const { rue, city, postalCode } = address;

    // Vérification si l'email est déjà utilisé
    const existingVeterinary = await Veterinary.findOne({ email });
    if (existingVeterinary) {
        res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
        return;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmpassword) {
        res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
        return;
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
 
       // Génération du token de vérification
       const verificationToken = crypto.randomBytes(32).toString("hex");

       
    // Création du nouveau vétérinaire
    const veterinaire = await Veterinary.create({
        fullname,
        email,
        specialite,
        address: {
            rue,
            city,
            postalCode,
        },
        nomCabinet,
        datebirth,
        phoneNumber,
        password: hashedPassword,
        confirmpassword: hashedPassword,
        role
    });
      // Assurez-vous que le rôle est correctement défini
      if (role !== 'veterinaire') {
        res.status(400).json({ message: 'Le rôle du vétérinaire doit être défini comme "veterinaire".' });
        return;
    }

    
 
    // Sauvegarde du token de vérification
    const tokenInstance= await Token.create({
        userId: veterinaire._id,
        ref: "veterinaire",
        role:'veterinaire',
        token: verificationToken
    });

    // Envoi de l'email de vérification
    const verificationUrl = `${process.env.BASE_URL}veterinaries/${veterinaire._id}/verify/${verificationToken}`;
    await envoyerVerification(email, verificationUrl);

    // Réponse avec succès
    res.status(201).json({
        fullname: veterinaire.fullname,
        email: veterinaire.email,
        role: veterinaire.role,
        message: "Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre email pour activer votre compte."
    });
});



const verifyEmail = async (req, res) => {
    const token = req.params.token;
    try {
        // Trouver le jeton dans la base de données
        const verificationToken = await Token.findOne({ token });

        if (!verificationToken) {
            return res.status(400).json({ message: "Le jeton de vérification n'est pas valide." });
        }

        // Trouver l'utilisateur associé au jeton
        const veterinaire = await Veterinary.findById(verificationToken.userId);

        if (!veterinaire) {
            return res.status(400).json({ message: "Vétérinaire non trouvé." });
        }

        // Mettre à jour le statut de vérification de l'utilisateur
        veterinaire.verified = true;
        await veterinaire.save();

        // Supprimer le jeton de vérification de la base de données en utilisant la méthode removeToken()
        await verificationToken.removeToken();

        // Répondre avec un message de succès
        return res.status(200).json({ message: "L'email a été vérifié avec succès." });
    } catch (error) {
        console.error("Erreur lors de la vérification de l'email :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la vérification de l'email." });
    }
};




// Fonction pour la connexion d'un vétérinaire
const loginVeterinary = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 

    try {
        // Recherche de l'utilisateur dans la base de données
        const veterinaire = await Veterinary.findOne({ email });

        if (!veterinaire) {
            throw new Error('veterinaire n\'existe pas');
        }

        // Vérification de l'existence de l'utilisateur et comparaison du mot de passe haché
        const isPasswordValid = await bcrypt.compare(password, veterinaire.password);
        
        if (!isPasswordValid) {
            throw new Error('mot de passe invalide');
        }

        // Vérification de l'email
        if (!veterinaire.verified) {
            return res.status(400).json({ message: "Votre compte n'est pas encore vérifié. Veuillez vérifier votre email pour activer votre compte." });
        }

        // Si l'utilisateur est vérifié, génération du token d'authentification JWT
        const token = generateToken(veterinaire._id,veterinaire.role);
        
        // Envoi des détails de l'utilisateur et du token
        res.json({
            _id: veterinaire.id,
            fullname: veterinaire.fullname,
            email: veterinaire.email,
            token: token
        });
    } catch (error) {
        console.error('Erreur lors de la connexion du vétérinaire:', error.message);
        res.status(400).json({ message: 'Informations d\'identification invalides' });
    }
});



async function getAllVet(req, res) {
    try {
        const vets = await Veterinary.find();
        if (vets.length > 0) {
            return res.status(200).json(vets);
        } else {
            return res.status(404).send('No Vets found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


async function getOneVet(req, res) {
    try {
        const veterinaire = await Veterinary.findById(req.params.id);
        if (veterinaire) {
            return res.status(200).json(veterinaire);
        } else {
            return res.status(404).send('Veterinary not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function getByEmail(req,res){
    const { email } = req.params;

    try {
      const veterinaire = await Veterinary.findOne({ email });
  
      if (!veterinaire) {
        return res.status(404).json({ message: 'Veterinary not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async function updateVet(req, res) {
    try {
    const vetId=req.params.id;
    const updateData = req.body;

    const updatedVet = await Veterinary.findByIdAndUpdate(
      vetId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Vet updated', vet: updatedVet });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vet', error });
  }
};
  

async function deleteVet(req, res) {
    try {
        const vet = await Veterinary.findByIdAndDelete(req.params.id);
        if (vet) {
            return res.status(200).json('Vet deleted');
        } else {
            return res.status(404).send('Vet not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function deleteExperience(req, res) {
    try {
        const { vetId } = req.body; // Obtenez l'ID du vétérinaire à partir du corps de la requête
        const { id: experienceId } = req.params; // Obtenez l'ID de l'expérience à supprimer à partir de la requête
        console.log("vetId:", vetId);
        console.log("experienceId:", experienceId);
        
        // Vérifiez si l'expérience appartient au vétérinaire
        const vet = await Veterinary.findById(vetId);
        if (!vet) {
            return res.status(404).send('Veterinarian not found');
        }

        const experience = vet.experience.id(experienceId);
        if (!experience) {
            return res.status(404).send('Experience not found or does not belong to the vet');
        }

         // Supprimez l'expérience de la liste des expériences du vétérinaire
         vet.experience.pull(experienceId);
        await vet.save();

        // Répondez avec un statut 200 OK et un message approprié
        return res.status(200).json('Experience deleted');
    } catch (error) {
        // Gérez les erreurs
        return res.status(500).send(error.message);
    }
}

async function uploadPhoto(req,res){
    try {
        const vetId = req.params.id;
        const vet = await Veterinary.findById(vetId);
    
        if (!vet) {
          return res.status(404).send('Veterinarian not found');
        }
    
        vet.profilePhoto = req.file.path; // Stockez le chemin du fichier dans le champ profilePhoto
        await vet.save();
    
        res.status(200).json(vet);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }


async function getVetProfile(req, res) {
    try {
       

        const veterinaire = await Veterinary.findById(req.params.id, {
            _id: 1,
            fullname: 1,
            email: 1,
            specialite: 1,
            address: 1,
            nomCabinet: 1,
            datebirth: 1,
            phoneNumber: 1,
            profile_picture: 1,
            verified: 1,
            pets:1,
            experience:1,
            description:1,
            profilePhoto:1,
            role: 1
        });
        if (veterinaire) {
            return res.status(200).json({ veterinaire });
        } else {
            return res.status(404).json({ message: "Vet not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
//fonctionne
async function getAllPetsOfVeterinary(req, res) {
    try {
        const vetId = req.params.id;
        // Utilisez la méthode findOne pour trouver le vétérinaire par son ID
        const veterinary = await Veterinary.findOne({ _id: vetId }).populate({
            path: 'pets',
            populate: {
                path: 'appointments'
            }
        });
        console.log("Veterinarian found:", veterinary);

        // Vérifiez si le vétérinaire existe
        if (!veterinary) {
            return res.status(404).json({ message: 'Veterinarian not found' });
        }

        // Retournez la liste des pets associés au vétérinaire
        return res.status(200).json(veterinary.pets);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



async function getDateTime(req,res){
    try{
        const vetId=req.params
        const availability=req.body
       // Enregistrement des jours et heures disponibles dans la base de données
       const vetAvailability = new VeterinaryAvailability({
        vetId,
        availability
    });
    await vetAvailability.save();

    return res.status(200).json({ message: 'Availability updated successfully' });
} catch (error) {
    console.error("An error occurred while updating availability:", error);
    return res.status(500).json({ message: 'An error occurred while updating availability' });
}

}
// Fonction pour générer le token JWT
const generateToken = (id,role) => {
    return jwt.sign({ id,role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};



module.exports = {
    registerVeterinary,
    loginVeterinary,
    getOneVet,
    deleteExperience,
    getAllVet,
    verifyEmail,
    deleteVet,
    updateVet,
    getAllPetsOfVeterinary,
    getDateTime,
    getVetProfile,
    getByEmail,
    uploadPhoto,
};
