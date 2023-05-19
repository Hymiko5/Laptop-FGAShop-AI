import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from "react-router-dom";


export default function ImageWidget({ laptopList }) {
  return (
    <>
       <ol>
         {laptopList.map((laptop, index) => {
           return (
            <Link to={`http://localhost:3000/laptop/${laptop.slug}`} target="_blank" rel="noopener noreferrer">
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  PhuongNamShop
                </Avatar>
              }
              title={laptop.shortName}
            />
            <CardMedia
              component="img"
              height="194"
              image={laptop.thumnail[0]}
              alt="image"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <ul>
                  <li>{laptop.configuration.CPU}</li>
                  <li>{laptop.configuration.RAM}</li>
                  <li>{laptop.configuration["Ổ cứng"]}</li>
                  <li>{laptop.configuration["Card màn hình"]}</li>
                  <li>{laptop.configuration["Hệ điều hành"]}</li>
                </ul>
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
          </Link>
           );
         })}
       </ol>
     </>

  );
}


