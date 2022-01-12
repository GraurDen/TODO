import './App.css';
import Header from './components/header/Header.jsx';
import Add_task from './components/add_task/Add_task.jsx';
import Options from './components/options/Options.jsx';

function App() {
    return (
        <div class='container'>
            <Header />

            {/* Content */}
            <div class='todo'>
                <Add_task />

                <Options />

                <div class='todo__items'>
                    {/*                 
                    <div class='todo__item'>
                        <div class='todo__item__input'>
                            <input type='checkbox' />
                        </div>
                        <div class='todo__item__text'>Do somthing</div>
                        <div class='todo__item__date'>11/01/2022</div>
                        <div class='todo__item__del'>
                            <button type='button'></button>
                        </div>
                    </div>

                    <div class='todo__item'>
                        <div class='todo__item__input'>
                            <input type='checkbox' />
                        </div>
                        <div class='todo__item__text'>Do somthing more</div>
                        <div class='todo__item__date'>11/01/2022</div>
                        <div class='todo__item__del'>
                            <button type='button'></button>
                        </div>
                    </div>

                    <div class='todo__item'>
                        <div class='todo__item__input'>
                            <input type='checkbox' />
                        </div>
                        <div class='todo__item__text'>Learn React</div>
                        <div class='todo__item__date'>11/01/2022</div>
                        <div class='todo__item__del'>
                            <button type='button'></button>
                        </div>
                    </div> */}
                </div>

                <div class='todo__pagination'>
                    <button class='btn-prev' disabled=''>
                        {' '}
                        «{' '}
                    </button>
                    <span class='pagination-selected'>1</span>
                    <span>2</span>
                    <span>3</span>
                    <button class='btn-next'> » </button>
                </div>
            </div>
        </div>
    );
}

export default App;
