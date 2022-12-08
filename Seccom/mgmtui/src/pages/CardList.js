import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Paginate from './Paginate';
import UserCard from "./UserCard";

export default function CardList({ clients }) {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    useEffect(() => {
        setBlogPosts(clients);
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
                                            <UserCard nameUser={currentPost.firstName + " " + currentPost.lastName}
                                                email={currentPost.email} createdOn={currentPost.createdTimestamp}
                                                client_id={currentPost.id} />
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