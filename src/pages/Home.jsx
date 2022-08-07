
import React from 'react';
import { PizzaBlockSkeleton } from '../components/PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import {Pagination} from "../components/Pagination/Pagination";
import usePagination from "../utils/usePagination";
import {SearchContext} from "../App";

const Home = () => {
    const sortList = [
        {value: 'популярности ( возрастанию )', sortType: 'rating', order: 'asc'},
        {value: 'популярности ( убыванию )', sortType: 'rating', order: 'desc'},
        {value: 'цене ( возрастанию )', sortType: 'price', order: 'asc'},
        {value: 'цене ( убыванию )', sortType: 'price', order: 'desc'},
        {value: 'алфавиту ( возрастанию )', sortType: 'rating', order: 'asc'},
        {value: 'алфавиту ( убыванию )', sortType: 'title', order: 'desc'}]
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortItem, setSortItem] = React.useState(sortList[0]);

    const {
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 4,
        count: 10,
    });

    const {searchValue} = React.useContext(SearchContext);

    const categorySearch = categoryId > 0 ? `category=${categoryId}` : ``;

    React.useEffect(() => {
      setIsLoading(true);
      fetch(`https://62e9731f3a5f1572e86aedb9.mockapi.io/pizzas?search=${searchValue}&page=${page}&limit=4${categorySearch}&sortBy=${sortItem.sortType}&order=${sortItem.order}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setPizzas(result);
        setIsLoading(false);
      })
    }, [categoryId, sortItem, categorySearch, page, searchValue]);

    return (
        <>
            <div className='content__top'>
            <Categories
                categoryId={categoryId}
                categories={['Все', 'Острые','Закрытые','Мясные','Вегетерианские']}
                onClickCategory={(id) => setCategoryId(id)}/>
            <Sort
                sortItem={sortItem}
                onClickSortType={(item) => setSortItem(item)}
                sortList={sortList}/>
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {isLoading ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index}/>)
            : pizzas.slice(0, lastContentIndex).map((pizza) => (
              <PizzaBlock
                key={pizza.id}
                title={pizza.title}
                price={pizza.price}
                imageSource={pizza.imageUrl}
                sizes={pizza.sizes}
                types={pizza.types}
              />
            ))}
          </div>
          <Pagination
              prevPage={prevPage}
              nextPage={nextPage}
              page={page}
              setPage={setPage}
              totalPages={totalPages}/>
        </>
    )
}

export default Home;
