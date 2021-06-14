import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../../redux/users/usersOperations'
import Loader from '../Loader'
import Pagination from '../Pagination'
import css from './Users.module.css'


const Index = () => {
    const [usersPagination, setUsersPagination] = useState({
        users: [],
        userPerPage: 5,
        currentPaginationPage: 1
    })
    const [currentUsers, setCurrentUsers] = useState([])
    const [paginationNumbers, setPaginationNumbers] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    const users = useSelector(state => state.users)
    const isLoading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)
    //set user to state
    useEffect(() => {
        setUsersPagination(prevState => {
            return {
                ...prevState, users: users
            }
        })
    }, [users])
    //set pagination  
    useEffect(() => {
        const { users, currentPaginationPage, userPerPage } = usersPagination;
        console.log('usersOnPage, currentPaginationPage, userPerPage: ', users, currentPaginationPage, userPerPage);

        const indexOfLastUser = currentPaginationPage * userPerPage;
        const indexOfFirstUser = indexOfLastUser - userPerPage;
        setCurrentUsers(users.slice(indexOfFirstUser, indexOfLastUser));
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / userPerPage); i++) {
            pageNumbers.push(i);
        }
        setPaginationNumbers(pageNumbers)

        if (usersPagination.length < usersPagination.userPerPage) {
            setUsersPagination(prevState => {
                return { ...prevState, currentPaginationPage: 1 }
            })
        }
    }, [usersPagination])
    //pagination click
    const handleClick = (event) => {
        setUsersPagination(prevState => {
            return {
                ...prevState,
                currentPaginationPage: Number(event.target.id)
            }
        })

    }

    return (
        <div className={css.usersBlock}>
            {isLoading && <Loader />}
            {!!currentUsers?.length &&
                <ul className={css.usersList}>
                    {currentUsers?.map(el =>
                        <li key={el.id} className={css.usersItem}>
                            <h2 className={css.title}><span className={css.description}>Name: </span>{el.name}</h2>
                            <h2 className={css.title}><span className={css.description}>Surname: </span>{el.surname}</h2>
                            <p><span className={css.description}>Description: </span>{el.desc}</p>
                        </li>
                    )}
                </ul>

            }
            {!!usersPagination?.users?.length &&
                <Pagination
                    paginationNumbers={paginationNumbers}
                    handleClick={handleClick}
                    usersPagination={usersPagination}
                />}
            {error && <h2>Something going wrong</h2>}
        </div>
    )
}

export default Index
