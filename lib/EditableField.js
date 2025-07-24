class NotificationManager {
    static instance = null;
    
    constructor() {
        if (NotificationManager.instance) {
            return NotificationManager.instance;
        }
        this.currentNotification = null;
        NotificationManager.instance = this;
    }
    
    show(message, type = 'success', duration = 3000) {
        this.hide();
        
        const notification = document.createElement('p');
        notification.className = `edit-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        this.currentNotification = notification;
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => this.hide(), duration);
    }
    
    hide() {
        if (this.currentNotification) {
            this.currentNotification.classList.remove('show');
            setTimeout(() => {
                if (this.currentNotification && this.currentNotification.parentNode) {
                    this.currentNotification.parentNode.removeChild(this.currentNotification);
                }
                this.currentNotification = null;
            }, 300);
        }
    }
}

class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.observers = new Set();
    }

    setState(updates) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        this.observers.forEach(observer => observer(this.state, prevState));
    }

    getState() {
        return { ...this.state };
    }

    subscribe(observer) {
        this.observers.add(observer);
        return () => this.observers.delete(observer);
    }

    cleanup() {
        this.observers.clear();
    }
}

export class EditableField {
    constructor(fieldName, initialValue = '', saveCallback) {
        this.fieldName = fieldName;
        this.saveCallback = saveCallback;
        this.stateManager = new StateManager({
            value: initialValue,
            isEditing: false
        });
        this.element = null;
        this.cleanup = null;
    }

    attachTo(element) {
        this.element = element;
        this.cleanup = this.stateManager.subscribe((state, prevState) => {
            this.render(state, prevState);
        });
        element.addEventListener('click', () => {
            if (!this.stateManager.getState().isEditing) {
                this.stateManager.setState({ isEditing: true });
            }
        });
        this.render(this.stateManager.getState());
        return this;
    }

    setValue(value) {
        this.stateManager.setState({ value });
        return this;
    }

    render(state, prevState = {}) {
        if (!this.element) return;
        const { value, isEditing } = state;

        if (isEditing && !prevState.isEditing) {
            const input = document.createElement('input');
            input.type = this.fieldName === 'birthdate' ? 'date' : 'text';
            input.value = this.formatForInput(value);
            input.className = 'profile-edit-input';
            
            this.element.innerHTML = '';
            this.element.appendChild(input);
            input.focus();

            input.addEventListener('blur', async () => {
                const newValue = input.value;
                const notification = new NotificationManager();
                
                try {
                    if (this.saveCallback) {
                        await this.saveCallback(this.fieldName, newValue);
                    }
                    this.stateManager.setState({ 
                        value: this.formatForDisplay(newValue), 
                        isEditing: false 
                    });
                    
                    const fieldLabels = {
                        'prenom': 'Prénom',
                        'nom': 'Nom',
                        'email': 'Email',
                        'phone': 'Téléphone',
                        'city': 'Ville',
                        'birthdate': 'Date de naissance'
                    };
                    
                    const fieldLabel = fieldLabels[this.fieldName] || this.fieldName;
                    notification.show(`${fieldLabel} mis à jour`);
                    
                } catch (error) {
                    notification.show('Erreur lors de la sauvegarde', 'error');
                    this.stateManager.setState({ isEditing: false });
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input.blur();
            });
        } else if (!isEditing) {
            this.element.textContent = this.formatForDisplay(value);
        }
    }

    formatForInput(value) {
        if (this.fieldName === 'birthdate' && value && value.includes('/')) {
            const parts = value.split('/');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
        }
        return value;
    }

    formatForDisplay(value) {
        if (this.fieldName === 'birthdate' && value) {
            try {
                return new Date(value).toLocaleDateString('fr-FR');
            } catch {
                return value;
            }
        }
        const emptyTexts = {
            'prenom': 'Prénom non renseigné',
            'nom': 'Nom non renseigné',
            'email': 'Email non renseigné',
            'phone': 'Téléphone non renseigné',
            'city': 'Ville non renseignée',
            'birthdate': 'Date de naissance non renseignée'
        };
        return value || emptyTexts[this.fieldName] || 'Non renseigné';
    }

    destroy() {
        if (this.cleanup) this.cleanup();
        this.stateManager.cleanup();
    }
}

export class EditableFieldManager {
    constructor(saveCallback) {
        this.fields = new Map();
        this.saveCallback = saveCallback;
    }

    createField(fieldName, initialValue = '') {
        const field = new EditableField(fieldName, initialValue, this.saveCallback);
        this.fields.set(fieldName, field);
        return field;
    }

    setFieldValue(fieldName, value) {
        const field = this.fields.get(fieldName);
        if (field) field.setValue(value);
    }

    cleanup() {
        this.fields.forEach(field => field.destroy());
        this.fields.clear();
    }
}

export { NotificationManager };
