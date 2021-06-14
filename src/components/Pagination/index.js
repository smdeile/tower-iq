import React from 'react'
import css from './Pagination.module.css'

function Index({paginationNumbers, handleClick,usersPagination}) {
    return (
        <ul className={css.pagination}>
                    <li className={css.paginationItem}>Страницы:</li>
                    {paginationNumbers.map((number) =>
                        <li
                            key={number}
                            id={number}
                            onClick={handleClick}
                            className={usersPagination.currentPaginationPage === number ? css.paginationSelected : css.paginationItem}
                        >
                            {number}
                        </li>
                    )}
                </ul> 
           
    )
}

export default Index
