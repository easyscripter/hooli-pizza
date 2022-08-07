import React from 'react';
const Categories = ({categories, categoryId, onClickCategory}) => {
    return (
        <div className="categories">
            <ul>
                {(categories !== undefined && categories.length !== 0) && categories.map((category, index) => (
                    <li onClick={() => onClickCategory(index)}
                    className={categoryId === index ? 'active' : ''}
                    key={index}>{category}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;
