import React from "react";
import {Card} from "antd";
import defaultImage from "../../images/defaultImage.png";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const {Meta} = Card;

const AdminProductCard = ({product, handleRemove}) => {
    const {title, description, images, slug} = product;
    return (
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : defaultImage}
                    style={{height: '150px', objectFit: 'cover'}}
                    className="p-1"
                    alt={title}
                />
            }
            actions={[
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className="text-warinig"/>
                </Link>,
                <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger"/>
            ]}
        >
            <Meta title={title} description={`${description && description.substring(0, 50)}...`}/>
        </Card>
    );
}

export default AdminProductCard;