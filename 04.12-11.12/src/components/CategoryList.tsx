import React from 'react';

const categories = ['Technology', 'Lifestyle', 'Travel', 'Food'];

const CategoryList = () => {
    return (
        <div className="category-list">
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;