import React from 'react'
import { useQuery } from 'react-query'
import { allRatingAndReviews } from '../service/opretions/Rating_Reviews';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from '@mui/material';


const Ratings = () => {
  
    const userView = async () =>{
        try {
          const result = await allRatingAndReviews();
          console.log("result",result)
          return result
        } catch (error) {
            console.log("Not Facting Of Data",error)
        }
    }


    const {isLoading,data,error} = useQuery({queryKey:['review'],queryFn:userView});

    console.log("data",data)

    if(error) return <div>{error.message}error</div>

    if(isLoading) return <div>Loading.....</div>

  return (
    <div className='flex justify-center items-center mx-auto mb-12 gap-x-5'>
        {
          data?.map((review)=> (
             <div key={review?.id}>
                   <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {
                   review.user === null ? <p>P</p> : <p>{review?.user?.Name.slice(0,1)}</p>
                }
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              review.user === null ? <p>Person name</p> : <p>{review?.user?.Name}</p>
           }
            subheader={
              review.user === null ? <p>{ Date().split(0,2)}</p> : <p>{review?.user?.createAt}</p>
           }
          />   
          <Rating name='size-small' defaultValue={review?.Rating} size='small' readOnly className='flex ml-7'></Rating> 
          <CardContent>
            <Typography variant="body2" color="text.secondary">
                {
                    review?.Review
                }
            </Typography>
          </CardContent>
    </Card>
             </div>
          ))
        }
    </div>
  )
}

export default Ratings