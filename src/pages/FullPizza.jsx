import React from 'react';
import {Link, useParams, useHistory} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {

    const {id} = useParams();
    const [pizza, setPizza] = React.useState();
    const history = useHistory();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://62e9731f3a5f1572e86aedb9.mockapi.io/pizzas/`,{
                    params: {
                        id: id,
                    }
                });
                setPizza(data[0]);
            } catch (e) {
                console.log('error:', e);
                alert('Пицца не найдена');
                history.goBack();
            }
        }
        fetchPizza();
    },[id]);

    if (!pizza) {
        return <>Загрузка...</>;
    }

    return (
        <div className="container">
            <img alt='pizza image' src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

export default FullPizza;
