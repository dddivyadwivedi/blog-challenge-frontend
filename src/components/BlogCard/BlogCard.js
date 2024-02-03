import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './BlogCardStyle.css';
import { useNavigate } from 'react-router-dom';

function BlogCard({postData}) {
    const navigate = useNavigate();
  return (
    <Card className="card">
      <Card.Img variant="top" src={postData.blogImageLink} />
      <Card.Body>
        <Card.Title>{postData.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Author : {postData.author}</Card.Subtitle>
        <Card.Text>
         {postData.description}
        </Card.Text>
        <Button variant="primary" onClick={()=>navigate(`/post/${postData.id}`)}>Read</Button>
        
      </Card.Body>
    </Card>
  );
}

export default BlogCard;