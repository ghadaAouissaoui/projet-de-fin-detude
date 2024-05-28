import React from 'react';
import { useState ,useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
function PawPrintIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="4" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
      </svg>
    )
  }
  export default function Review() {
    const { userId } = useParams();
    const [UserProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({
      name: '',
      email: '',
      review: '',
      rating: '4'
    });
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
          const { user } = response.data;
          setUserProfile(user);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [userId]);
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/reviews/user/${userId}`);
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
  
      fetchReviews();
    }, [userId]);
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setReviewData({ ...reviewData, [id]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:5000/api/reviews`, {
          ...reviewData,
          userId,
          rating: parseInt(reviewData.rating)
        });
        setReviews([...reviews, response.data]);
        setReviewData({
          name: '',
          email: '',
          review: '',
          rating: '4'
        });
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    };
  
    return (
      <div className="flex w-full h-[600px]">
        <div className="bg-[#0B2447] md:w-[15%] w-[20%] px-6 py-4 text-white sticky top-0 h-[600px] overflow-y-auto">
          <div className="flex flex-col items-start gap-6">
            <Link className="flex items-center gap-2" to={`/espaceclient/${UserProfile?._id}`}>
              <PawPrintIcon className="h-6 w-6" />
              <span className=''>{UserProfile?.fullname} Dashboard</span>
            </Link>
            {UserProfile && (
              <nav className="flex flex-col items-start gap-4">
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/pets/${UserProfile._id}`}>Pets</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/appointment/${UserProfile._id}`}>Appointments</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/review/${UserProfile._id}`}>Review</Link>
                <Link className="hover:text-[#A5D7E8]" to={`/espaceclient/messages/${UserProfile._id}`}>Messages</Link>
              </nav>
            )}
          </div>
        </div>
        <div className="flex-1 bg-[#F0F0F0] overflow-y-auto">
          <header className="bg-white dark:bg-[#0B2447] px-6 py-4 shadow sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
              <Button className="hidden md:inline-flex bg-[#1F4690] hover:bg-[#1F4690]/90 text-white " variant="text" >My pets</Button>
            </div>
          </header>
          <Box component="section" bgcolor="background.paper" py={{ xs: 12, md: 16, lg: 20 }}>
            <Container>
              <Box maxWidth="sm" mx="auto" textAlign="center">
                <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                  Share Your Experience
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Let us know what you think about our products or services.
                </Typography>
              </Box>
              <Box mt={{ xs: 10, md: 12 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        id="name"
                        placeholder="Enter your name"
                        variant="outlined"
                        value={reviewData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        variant="outlined"
                        value={reviewData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Review"
                        id="review"
                        placeholder="Share your thoughts"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={reviewData.review}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel component="legend">Rating</FormLabel>
                      <RadioGroup
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                        row
                      >
                        {[5, 4, 3, 2, 1].map((value) => (
                          <FormControlLabel
                            key={value}
                            value={value.toString()}
                            control={<Radio color="primary" />}
                            label={<StarIcon color={value <= reviewData.rating ? "primary" : "disabled"} />}
                            labelPlacement="top"
                          />
                        ))}
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" color="primary" type="submit">
                        Submit Review
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Container>
          </Box>
          <Box component="section" bgcolor="background.paper" py={{ xs: 12, md: 16, lg: 20 }}>
            <Container>
              <Box maxWidth="sm" mx="auto" textAlign="center">
                <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                  User Reviews
                </Typography>
              </Box>
              <Box mt={{ xs: 10, md: 12 }}>
                {reviews.map((review) => (
                  <Box key={review._id} mb={4} p={2} border="1px solid #ccc" borderRadius="8px">
                    <Typography variant="h6">{review.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{review.email}</Typography>
                    <Typography variant="body1">{review.review}</Typography>
                    <Typography variant="body2">Rating: {review.rating}</Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        </div>
      </div>
    );
  }