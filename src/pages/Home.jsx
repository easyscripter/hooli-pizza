
import React from 'react';
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import {Pagination} from "../components/Pagination/Pagination";
import usePagination from "../utils/usePagination";
import {useDispatch, useSelector} from "react-redux";
import {selectCategoryId, selectSortItem, setCategoryId} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzas} from "../redux/slices/pizzasSlice";
import {selectSearchValue} from "../redux/slices/searchSlice";
import {Link} from "react-router-dom";

const Home = () => {
    const {sortType, order} = useSelector(selectSortItem);
    const {pizzas, status} = useSelector(selectPizzas);
    const searchValue = useSelector(selectSearchValue);
    const categoryId = useSelector(selectCategoryId);
    const sortList = [
        {value: 'популярности ( возрастанию )', sortType: 'rating', order: 'asc'},
        {value: 'популярности ( убыванию )', sortType: 'rating', order: 'desc'},
        {value: 'цене ( возрастанию )', sortType: 'price', order: 'asc'},
        {value: 'цене ( убыванию )', sortType: 'price', order: 'desc'},
        {value: 'алфавиту ( возрастанию )', sortType: 'title', order: 'asc'},
        {value: 'алфавиту ( убыванию )', sortType: 'title', order: 'desc'}]

    const dispatch = useDispatch();

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 4,
        count: pizzas.length,
    });

    const categorySearch = categoryId > 0 ? `category=${categoryId}` : ``;

    React.useEffect(() => {
        dispatch(
                fetchPizzas({
                    searchValue,
                    sortType,
                    order,
                    categorySearch
                }));
    }, [categorySearch, categoryId, sortType, order]);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    return (
        <div className='container'>
    <div className='content__top'>
        <Categories
            categoryId={categoryId}
            categories={['Все', 'Острые', 'Закрытые', 'Мясные', 'Вегетерианские']}
            onClickCategory={(id) => onChangeCategory(id)}/>
        <Sort sortList={sortList}/>
    </div>
    <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>Кажется, нам не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className='content__items'>
                    {
                        status === 'loading' ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index}/>)
                            : pizzas.slice(firstContentIndex, lastContentIndex).map((pizza) => (
                                <Link to={`/pizza/${pizza.id}`}>
                                    <PizzaBlock
                                        key={pizza.id}
                                        id={pizza.id}
                                        title={pizza.title}
                                        price={pizza.price}
                                        imageSource={pizza.imageUrl}
                                        sizes={pizza.sizes}
                                        types={pizza.types}
                                    />
                                </Link>
                            ))
                    };
                </div>
            )}}
    <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        page={page}
        setPage={setPage}
        totalPages={totalPages}/>
    </div>
    )
}

export default Home;
