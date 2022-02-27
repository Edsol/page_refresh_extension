class Tab {
    id = null;
    timer = null;
    status = null;
    randomize = false;
    badge = 'Off';
    interval_id = null;

    constructor(id, timer, status, randomize, badge, interval_id) {
        this.id = id;
        this.timer = timer;
        this.status = status;
        this.randomize = randomize;
        this.badge = badge;
        this.interval_id = interval_id;
    }

    get(fieldName) {
        console.log('fieldName', fieldName);
        // return this[[fieldName]];
    }

}

export default Tab;