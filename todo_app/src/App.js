import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <div class='container'>
            <div class='title'>
                <h1>ToDo</h1>
            </div>

            <div class='todo'>
                <div class='todo__input'>
                    <div class='todo__task'>
                        <input type='text/' placeholder='I want to...' />
                    </div>
                    <div class='todo__button'>
                        <button>Add</button>
                    </div>
                </div>

                <div class='todo__options'>
                    <div class='todo__options__left'>
                        <button class='all btn_active_underline'>all</button>
                        <button class='done'>done</button>
                        <button class='undone'>undone</button>
                    </div>

                    <div class='todo__options__right'>
                        <div class='todo__options__name'>Sort by Date</div>
                        <div class='todo__options_sort'>
                            <button class='new'></button>
                            <button class='last btn_active_bg'></button>
                        </div>
                    </div>
                </div>

                <div class='todo__items'>
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
                    </div>
                </div>

                <div class='todo__pagination'>
                    <button class='btn-prev' disabled=''>
                        {" "}
                        «{" "}
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
