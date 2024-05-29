import React from "react";
import image from "../images/doc.jpg";
import fond from "../images/2.jpeg";

import { Button, Avatar,Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { jwtDecode } from "jwt-decode";



export default function DoctorProfile() {
  const { vetId } = useParams();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const [formData, setFormData] = useState({
      fullname: '',
      specialite: '',
      experience: [],
    });

    const [editMode, setEditMode] = useState(false);

const token=localStorage.getItem('token');
const decoded = jwtDecode(token);
console.log(token)

const [editedDescription, setEditedDescription] = useState('');
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleSubmitDescription = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await Axios.put(
        `http://localhost:5000/api/veterinaries/${vetId}`,
        { description: editedDescription },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setVetProfile(response.data.veterinaire);
      // Attendre un court instant avant de recharger la page
      setTimeout(() => {
        window.location.reload();
      }, 20);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour de la description :", error);
    }
  };

    const [vetProfile, setVetProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      const fetchVetProfile = async () => {
        try {
          const response = await Axios.get(`http://localhost:5000/api/veterinaries/profile/${vetId}`);
          setVetProfile(response.data.veterinaire);
                  setEditedDescription(response.data.description || '');
                  setPreviewImage(response.data.profilePhoto || '');
          console.log("prooofile",response.data.veterinaire)
          // Synchronisez les données récupérées avec formData
        setFormData({
          fullname: response.data.veterinaire.fullname || '',
          specialite: response.data.veterinaire.specialite || '',
          description: response.data.veterinaire.description || '',
          profilePhoto: response.data.veterinaire.profilePhoto || '',
          experience: response.data.veterinaire.experience || [], // Initialisez avec les données récupérées
        });
          setLoading(false);
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération du profil du vétérinaire :", error);
          setLoading(false);
        }
      };
  
      fetchVetProfile();
    }, [vetId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await Axios.put(
        `http://localhost:5000/api/veterinaries/${vetId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setVetProfile(response.data.veterinaire);
       // Attendre un court instant avant de recharger la page
    setTimeout(() => {
      window.location.reload();
    }, 20);
      setEditMode(false);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour du profil :", error);
    }
  };

     // Gestion de la modification d'une expérience
     const handleExperienceChange = (index, e) => {
      const { name, value } = e.target;
      const updatedExperience = formData.experience.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      );
      setFormData(prevData => ({
        ...prevData,
        experience: updatedExperience,
      }));
    };
  
    const [openDialog, setOpenDialog] = useState(false);
    const [newExperience, setNewExperience] = useState({
      institution: "",
      role: "",
      type: "",
      startDate: "",
      endDate: "",
      location: "",
    });
  
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };


    // Gestion de l'ajout d'une nouvelle expérience
    const handleAddExperience = async () => {
  
      try {
        const response = await Axios.put(
          `http://localhost:5000/api/veterinaries/${vetId}`,
          {
            ...formData,
            experience: [...formData.experience, newExperience] // Ajouter la nouvelle expérience au tableau existant
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        // Mettre à jour le profil vétérinaire avec les nouvelles données
        setVetProfile(response.data.veterinaire);
        // Fermer le dialogue après soumission réussie
        handleCloseDialog();
        // Attendre un court instant avant de recharger la page
        setTimeout(() => {
          window.location.reload();
        }, 20);
        // Passer en mode d'édition à false après soumission réussie
        setEditMode(false);
      } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour du profil :", error);
        // Gérer l'erreur ici (affichage d'un message d'erreur, etc.)
      }
    };
    
      // Gestion de la suppression d'une expérience
    const handleRemoveExperience = index => {
      const updatedExperience = formData.experience.filter((_, i) => i !== index);
      setFormData(prevData => ({
        ...prevData,
        experience: updatedExperience,
      }));
    };

    const deleteExperience = async (experienceId, vetId) => {
      try {
          const response = await Axios.delete(
              `http://localhost:5000/api/veterinaries/experience/${experienceId}`, 
              {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  },
                  data: { vetId } // Envoyer vetId dans le corps de la requête
              }
          );
  
          if (response.status === 200) {
              // Expérience supprimée avec succès
              console.log("Experience deleted");
              setTimeout(() => {
                window.location.reload();
              }, 20);
              // Mettre à jour le profil du vétérinaire ou recharger la page pour refléter les changements
          } else {
              // Gérer les erreurs si nécessaire
              console.error("Error deleting experience");
          }
      } catch (error) {
          console.error("An error occurred while deleting experience:", error);
          // Gérer les erreurs si nécessaire
      }
  };
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmitPhoto = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePhoto', selectedFile);
    

    try {
      const response = await Axios.put(
        `http://localhost:5000/api/veterinaries/${vetId}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setVetProfile(response.data);
      
      setEditMode(false);
      setTimeout(() => {
        window.location.reload();
      }, 20);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour de la photo de profil :", error);
    }
  };

  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const handlePhotoClick = () => {
    setIsEditingPhoto(true);
  };
  
  const handleCancelEditPhoto = () => {
    setIsEditingPhoto(false);
  };

  return (
   
    <div className="bg-gray-100">
 <div className="bg-white mb-10 m-auto w-[60%]">
      <div className="w-full">
        <img src={fond} alt="" className="lg:h-[250px] w-full rounded-2xl" />
      </div>
      <div className="relative -top-[80px] left-[40px]">
  <div className="text-sm text-black mb-4">
    <div className="mb-4">
      {vetProfile && vetProfile.profilePhoto ? (
      
        <a href="#" onClick={handlePhotoClick}>
          <img
    src={`http://localhost:5000/${vetProfile.profilePhoto}`} // Assurez-vous de spécifier l'URL complète du serveur
    alt="Profile"
    className="w-32 h-32 mb-0 pb-0 rounded-full"
/></a>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
    {decoded.role === "veterinaire" && isEditingPhoto && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
    <div className="bg-white p-4 rounded-md">
      <input type="file" onChange={handleFileChange} className="mt-2" />
      <div className="flex justify-between mt-2">
        <Button onClick={handleSubmitPhoto} className="text-white bg-blue-500 rounded-md px-4 py-2">
          Upload Photo
        </Button>
        <Button onClick={handleCancelEditPhoto} className="text-gray-500 bg-gray-200 rounded-md px-4 py-2">
          Cancel
        </Button>
      </div>
    </div>
  </div>
)}

  </div>
</div>

       
     <div className="flex flex-row gap-8 max-md:gap-4 max-md:flex-wrap px-6">
        <div className="col-span-2 space-y-4 mt-[-70px]">
          <div className="flex items-center space-x-4">           
          {decoded.role === "veterinaire" && editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="specialite" className="block text-sm font-medium text-gray-700">
                    Specialty
                  </label>
                  <input
                    type="text"
                    name="specialite"
                    id="specialite"
                    value={formData.specialite}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex space-x-4  ">
                  <Button type="submit" className="rounded-md py-2 px-4  text-white  bg-blue-500 hover:bg-blue-600">Save</Button>
                  <Button type="button" className="rounded-md py-2 px-4  text-white  bg-blue-500 hover:bg-blue-600" onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-xl font-semibold">{vetProfile?.fullname}</h1>
                <p className="text-sm font-semibold text-gray-500">{vetProfile?.specialite}</p>
                {decoded.role === "veterinaire" &&(<Button className="rounded-md py-2 px-4  text-white  bg-blue-500 hover:bg-blue-600" onClick={() => setEditMode(true)}>Edit</Button>)}
              </>
            )}
           
          </div>


          <div>
      <h2 className="text-lg font-bold">Doctor Profile</h2>
      {vetProfile && (
        <div className="text-sm text-black mb-4">
          {editMode ? (
            <>
              <textarea
                value={editedDescription}
                onChange={handleChange}
                className="border rounded-md p-2 mb-2 w-full"
              />
              <Button onClick={handleSubmitDescription} className="text-white bg-blue-500 rounded-md px-4 py-2">
                Save
              </Button>
              <Button onClick={() => setEditMode(false)} className="text-white bg-gray-500 rounded-md px-4 py-2 ml-2">
                Cancel
              </Button>
            </>
          ) : (
            vetProfile.description ? (
              showFullDescription ? (
                <>
                  <p>{vetProfile.description}</p>
                  <div className="flex flex-row">
                    <Button
                      onClick={toggleDescription}
                      className="bg-blue-500 text-white cursor-pointer rounded-l-md mt-[10px]"
                    >
                      Show Less
                    </Button>
                    <div
                      className="bg-blue-500 rounded-r-md pt-2 mt-[10px] hover:bg-blue-600 cursor-pointer"
                      onClick={toggleDescription}
                    >
                      <ChevronUp />
                    </div>
                  </div>
                </>
              ) : (
                <p>
                  {vetProfile.description.slice(0, 300)}...
                  <div className="flex flex-row">
                    <Button
                      onClick={toggleDescription}
                      className="text-white bg-blue-500 mt-[10px] rounded-l-md  hover:bg-blue-600 cursor-pointer"
                    >
                      See More
                    </Button>
                    <div
                      className="bg-blue-500 rounded-r-md pt-2 mt-[10px] hover:bg-blue-600 cursor-pointer"
                      onClick={toggleDescription}
                    >
                      <ChevronDown />
                    </div>
                  </div>
                </p>
              )
            ) : (
              <>
                <textarea
                  value={editedDescription}
                  onChange={handleChange}
                  className="border rounded-md p-2 mb-2 w-full"
                  placeholder="Enter a description..."
                />
                <Button onClick={handleSubmitDescription} className="text-white bg-blue-500 rounded-md px-4 py-2">
                  Save
                </Button>
              </>
            )
          )}
        
        </div>
      )}


    </div>





        </div>
      </div>

      


      <div className="flex flex-row max-md:flex-wrap gap-12 p-6 w-full">
        <div className="col-span-2 space-y-4 w-1/2 max-md:w-full">
          <h2 className="text-lg font-bold">Practice Experience</h2>
          <div className="space-y-2">
          <form onSubmit={handleSubmit}>
            {decoded.role === "veterinaire" && editMode ? (
              formData.experience.map((exp, index) => (
                <Card key={index} className="p-4">
                  <CardHeader>
                    <CardTitle>
                      <input
                        type="text"
                        name="institution"
                        value={exp.institution}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Institution"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <input
                      type="text"
                      name="role"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      name="type"
                      value={exp.type}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Type"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="End Date"
                    />
                    <input
                      type="text"
                      name="location"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Location"
                    />
                    <Button type="submit" className="rounded-md py-2 px-4  text-white  bg-blue-500 hover:bg-blue-600">Save</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
              {vetProfile  && vetProfile?.experience.map((exp, index) => (
            <Card key={index} className="p-4 mb-4">
            <CardHeader>
              <CardTitle>{exp.institution}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{exp.role} • {exp.type}</p>
              <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm">{exp.location}</p>
              <Button className="rounded-md py-2 px-4  text-white  bg-blue-500 hover:bg-blue-600" onClick={() => setEditMode(true)}>Edit</Button>
              <Button
    className="rounded-md mt-2 bg-red-500 text-white py-2 px-4"
    onClick={() => {
        console.log("Deleting experience with ID:", exp._id);
        console.log("Vet ID:", vetProfile._id);
        deleteExperience(exp._id, vetProfile._id);
    }}
>
    Remove
</Button>



               
            </CardContent>
          </Card>
          ))}
          </>
          
            )}</form>
           
          { decoded.role === "veterinaire" && (<Button
        className="rounded-md mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        onClick={handleOpenDialog}
      >
        Add Experience
      </Button>)}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Add New Experience</DialogTitle>
  <DialogContent>
    {/* Champs d'entrée pour les données de l'expérience */}
    <TextField
      autoFocus
      required
      margin="dense"
      name="institution"
      label="Institution"
      type="text"
      fullWidth
      value={newExperience.institution}
      onChange={(e) => setNewExperience({ ...newExperience, institution: e.target.value })}
    />
    <TextField
     required
      margin="dense"
      name="role"
      label="Role"
      type="text"
      fullWidth
      value={newExperience.role}
      onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
    />
    <TextField
     required
      margin="dense"
      name="type"
      label="Type"
      type="text"
      fullWidth
      value={newExperience.type}
      onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
    />
    <TextField
      margin="dense"
      required
      name="startDate"
      label="Start Date"
      type="date"
      fullWidth
      value={newExperience.startDate}
      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
    />
    <TextField
      margin="dense"
      required
      name="endDate"
      label="End Date"
      type="date"
      fullWidth
      value={newExperience.endDate}
      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
    />
    <TextField
      margin="dense"
      name="location"
      required
      label="Location"
      type="text"
      fullWidth
      value={newExperience.location}
      onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    {/* Boutons d'action du dialogue */}
    <Button onClick={handleCloseDialog}>Cancel</Button>
    <Button onClick={handleAddExperience}>Save</Button>
  </DialogActions>
</Dialog>


          
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};




function ChevronDown(props) {
    return (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="6 9 12 15 18 9"></polyline>
</svg>
)
}

function ChevronUp(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="18 15 12 9 6 15"></polyline></svg>
    )
  }


// AvatarImage component
export const AvatarImage = ({ alt, src, className }) => {
  return <img className={` ${className}`} alt={alt} src={src} />;
};


// AvatarFallback component
export const AvatarFallback = ({ children }) => {
  return <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">{children}</div>;
};


// Input component
export const Input = (props) => {
  return (
    <input
      {...props}
      className={`  ${props.className}`}
    />
  );
};



function Badge({ children, variant }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {children}
    </span>
  );
}

  // Card component
export const Card = ({ children, className }) => {
return (
  <div className={`bg-white p-4 shadow rounded-lg ${className}`}>
    {children}
  </div>
);
};
function CardTitle({ children }) {
  return <h3 className="text-lg font-bold mb-4">{children}</h3>;
}


// CardHeader component
export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

// CardContent component
export function CardContent({ children }) {
  return <div>{children}</div>;
}



