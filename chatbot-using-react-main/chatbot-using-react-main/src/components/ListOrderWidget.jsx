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


export default function ListOrderWidget({ listOrder }) {
    console.log(listOrder)
  return (
    <>
       <ol>
       {listOrder.map((order, index) => {
           return (
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  PhuongNamShop
                </Avatar>
              }
              title= {"Đơn hàng: " + order._id.$oid}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <ul>
                  <li>{"Ngày: " + order.date.$date}</li>
                  <li>{"Địa chỉ: " + order.deliverAddress.address + "," + order.deliverAddress.district + "," + order.deliverAddress.provincial + "," + order.deliverAddress.ward}</li>
                  <li>{"Phương thức nhận hàng: " + order.deliverWay}</li>
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
           );
         })}
       </ol>
     </>

  );
}