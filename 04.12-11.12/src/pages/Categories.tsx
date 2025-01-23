import React, { useEffect } from 'react';
import CategoryList from "../components/CategoryList";

interface CategoriesProps {
    setCurrentPage: (page: string) => void; // Prop do ustawienia nazwy strony
}

const Categories: React.FC<CategoriesProps> = ({ setCurrentPage }) => {
    useEffect(() => {
        setCurrentPage('Categories'); // Ustaw nazwę strony na "Categories"
    }, [setCurrentPage]);

    return (
        <div className="categories">
            <h1>Categories</h1>
            <CategoryList/>
            </div>
    );
};

export default Categories;