import { BaseComponent, createComponentFunction } from '../lib/BaseComponent.js';

class CounterComponent extends BaseComponent {
    constructor(props = {}) {
        super();
        
        this.state = {
            count: props.initialCount || 0,
            message: 'Cliquez pour incrémenter',
            theme: 'light'
        };

        this.addObserver((newState, prevState) => {
            console.log('État changé:', { prevState, newState });
        });
    }

    increment() {
        this.setState(prevState => ({
            count: prevState.count + 1,
            message: `Compteur: ${prevState.count + 1}`
        }));
    }

    decrement() {
        this.setState(prevState => ({
            count: Math.max(0, prevState.count - 1),
            message: prevState.count > 0 ? `Compteur: ${prevState.count - 1}` : 'Minimum atteint'
        }));
    }

    reset() {
        this.setState({
            count: 0,
            message: 'Compteur remis à zéro'
        });
    }

    toggleTheme() {
        this.setState(prevState => ({
            theme: prevState.theme === 'light' ? 'dark' : 'light'
        }));
    }

    render() {
        const { count, message, theme } = this.state;
        
        return this.createElementWithEvents('div', [
            ['class', `counter-component theme-${theme}`],
            ['style', `padding: 20px; border: 1px solid #ccc; border-radius: 8px; background: ${theme === 'light' ? '#fff' : '#333'}; color: ${theme === 'light' ? '#333' : '#fff'};`]
        ], {}, [
            this.createElement('h2', [], ['Compteur Réactif']),
            
            this.createElement('div', [
                ['style', 'font-size: 24px; margin: 20px 0; text-align: center;']
            ], [`Valeur: ${count}`]),
            
            this.createElement('p', [
                ['style', 'text-align: center; font-style: italic;']
            ], [message]),
            
            this.createElement('div', [
                ['style', 'display: flex; gap: 10px; justify-content: center; margin: 20px 0;']
            ], [
                this.createElementWithEvents('button', [
                    ['style', 'padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;']
                ], {
                    click: [() => this.increment()]
                }, ['+ Incrémenter']),
                
                this.createElementWithEvents('button', [
                    ['style', 'padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;']
                ], {
                    click: [() => this.decrement()]
                }, ['- Décrémenter']),
                
                this.createElementWithEvents('button', [
                    ['style', 'padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;']
                ], {
                    click: [() => this.reset()]
                }, ['Reset'])
            ]),
            
            this.createElement('div', [
                ['style', 'text-align: center; margin-top: 20px;']
            ], [
                this.createElementWithEvents('button', [
                    ['style', 'padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;']
                ], {
                    click: [() => this.toggleTheme()]
                }, [`Thème: ${theme}`])
            ]),
            
            this.renderIf(count > 10, 
                this.createElement('div', [
                    ['style', 'margin-top: 20px; padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; color: #856404;']
                ], ['🎉 Bravo ! Vous avez dépassé 10 !'])
            )
        ]);
    }

    mount(container) {
        super.mount(container);
    }
}

class TestPage extends BaseComponent {
    constructor() {
        super();
        
        this.state = {
            showCounter: true,
            pageTitle: 'Page de Test Réactive',
            counters: [
                { id: 1, name: 'Compteur A' },
                { id: 2, name: 'Compteur B' }
            ]
        };
    }

    toggleCounter() {
        this.setState(prevState => ({
            showCounter: !prevState.showCounter
        }));
    }

    addCounter() {
        this.setState(prevState => ({
            counters: [
                ...prevState.counters,
                { 
                    id: Date.now(), 
                    name: `Compteur ${String.fromCharCode(65 + prevState.counters.length)}` 
                }
            ]
        }));
    }

    removeCounter(id) {
        this.setState(prevState => ({
            counters: prevState.counters.filter(counter => counter.id !== id)
        }));
    }

    render() {
        const { showCounter, pageTitle, counters } = this.state;

        return this.createElement('div', [
            ['style', 'max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;']
        ], [
            this.createElement('h1', [
                ['style', 'text-align: center; color: #333;']
            ], [pageTitle]),
            
            this.createElement('div', [
                ['style', 'text-align: center; margin: 20px 0;']
            ], [
                this.createElement('button', [
                    ['style', 'padding: 10px 20px; margin: 0 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;']
                ], [showCounter ? 'Masquer Compteur' : 'Afficher Compteur']),
                
                this.createElement('button', [
                    ['style', 'padding: 10px 20px; margin: 0 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;']
                ], ['Ajouter Compteur'])
            ]),
            
            this.renderIf(showCounter,
                this.createElement('div', [
                    ['style', 'margin: 30px 0;']
                ], [
                    this.createElement('h3', [], ['Compteur Principal']),
                    this.createElement('div', [['id', 'main-counter']], [])
                ])
            ),
            
            this.createElement('div', [
                ['style', 'margin: 30px 0;']
            ], [
                this.createElement('h3', [], [`Compteurs (${counters.length})`]),
                this.createElement('div', [
                    ['style', 'display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));']
                ], this.renderList(counters, (counter) => 
                    this.createElement('div', [
                        ['style', 'position: relative; border: 1px solid #ddd; border-radius: 8px; padding: 10px;']
                    ], [
                        this.createElement('h4', [], [counter.name]),
                        this.createElement('button', [
                            ['style', 'position: absolute; top: 5px; right: 5px; background: #dc3545; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;']
                        ], ['×']),
                        this.createElement('div', [['id', `counter-${counter.id}`]], [])
                    ])
                ))
            ])
        ]);
    }

    mount(container) {
        super.mount(container);
        
        setTimeout(() => {
            const buttons = container.querySelectorAll('button');
            if (buttons[0]) buttons[0].addEventListener('click', () => this.toggleCounter());
            if (buttons[1]) buttons[1].addEventListener('click', () => this.addCounter());
            
            const removeButtons = container.querySelectorAll('button[style*="border-radius: 50%"]');
            removeButtons.forEach((btn, index) => {
                const counter = this.state.counters[index];
                if (counter) {
                    btn.addEventListener('click', () => this.removeCounter(counter.id));
                }
            });
            
            if (this.state.showCounter) {
                const mainCounterContainer = container.querySelector('#main-counter');
                if (mainCounterContainer) {
                    const mainCounter = new CounterComponent({ initialCount: 5 });
                    mainCounter.mount(mainCounterContainer);
                }
            }
            
            this.state.counters.forEach(counter => {
                const counterContainer = container.querySelector(`#counter-${counter.id}`);
                if (counterContainer) {
                    const counterComponent = new CounterComponent({ initialCount: 0 });
                    counterComponent.mount(counterContainer);
                }
            });
            
        }, 10);
    }
}

export const TestPageFunction = createComponentFunction(TestPage);
export const CounterComponentFunction = createComponentFunction(CounterComponent);

export default TestPageFunction;