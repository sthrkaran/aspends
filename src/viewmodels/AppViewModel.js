import { AppData } from '../models/AppModel.js';

export class AppViewModel {
    constructor() {
        this.data = AppData;
        this.listeners = [];
    }

    getHeroData() {
        return this.data.hero;
    }

    getFaqData() {
        return this.data.faq;
    }

    getMockupData() {
        return this.data.mockups;
    }

    toggleFaq(id) {
        this.data.faq = this.data.faq.map(item => ({
            ...item,
            isOpen: item.id === id ? !item.isOpen : false
        }));
        this.notifyListeners();
    }

    // Simple observer pattern to update the view
    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.data));
    }
}
