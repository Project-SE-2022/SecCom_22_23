import React from 'react';
import Button from 'react-bootstrap/Button';

const Paginate = ({
	postsPerPage,
	totalPosts,
	currentPage,
	paginate,
	previousPage,
	nextPage,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="pagination-container">
			<ul className="pagination">
				<li onClick={previousPage} className="page-number">
					<Button onClick={previousPage} variant="outline-primary">Previous</Button>
				</li>
				{pageNumbers.map((number) => (
					<li style={{ marginLeft: '0.5%' }}>
						<Button key={number}
							onClick={() => paginate(number)}
							className={
								'page-number ' + (number === currentPage ? 'active' : '')
							} variant="outline-primary">{number}</Button>
					</li>
				))}
				<li className="page-number" style={{ marginLeft: '0.5%' }}>
					<Button onClick={nextPage} variant="outline-primary">Next</Button>
				</li>
			</ul>
		</div>
	);
};

export default Paginate;