import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Paginate from './Paginate';
import UserCard from "./UserCard";

const posts = [
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client",
        "firstName": "Client",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client2",
        "firstName": "Client2",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client3",
        "firstName": "Client3",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client4",
        "firstName": "Client4",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client5",
        "firstName": "Client5",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client6",
        "firstName": "Client6",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client7",
        "firstName": "Client7",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client8",
        "firstName": "Client8",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client",
        "firstName": "Client",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client2",
        "firstName": "Client2",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client3",
        "firstName": "Client3",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client4",
        "firstName": "Client4",
        "lastName": "Seccom"
    },
    {
        "id": "9a940788-2aaf-4ae8-9932-b6569d20e54b",
        "createdTimestamp": 1668814035085,
        "username": "client5",
        "firstName": "Client5",
        "lastName": "Seccom"
    }
]

export default function CardList() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    useEffect(() => {
        setBlogPosts(posts);
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(blogPosts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                {blogPosts ? (
                    <div style={{ paddingTop: '50px' }}>
                        <Row>
                            <div className="blog-content-section">
                                <div className="" style={{ display: 'inline', textAlign: 'center' }}>
                                    {currentPosts.map((currentPost) => (
                                        <div style={{ float: 'left' }}>
                                            <UserCard nameUser={currentPost.firstName + " " + currentPost.lastName} email={currentPost.username} createdOn={currentPost.createdTimestamp} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Row>
                        <Row style={{ textAlign: 'center' }}>
                            <Paginate
                                postsPerPage={postsPerPage}
                                totalPosts={blogPosts.length}
                                currentPage={currentPage}
                                paginate={paginate}
                                previousPage={previousPage}
                                nextPage={nextPage}
                            />
                        </Row>
                    </div>
                ) : (
                    <div className="loading">Loading...</div>
                )}
            </div>
        </>
    );
}