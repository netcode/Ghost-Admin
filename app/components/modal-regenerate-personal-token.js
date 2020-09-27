import ModalComponent from 'ghost-admin/components/modal-base';
import {inject as service} from '@ember/service';
import {task} from 'ember-concurrency';

export default ModalComponent.extend({
    ajax: service(),
    store: service(),
    ghostPaths: service(),
    errorMessage: null,
    generateToken: task(function* (){    
        try {
            let url = this.get('ghostPaths.url').api('users', 'generate_token'); 

            let response = yield this.ajax.post(url, {
                data: {}
            });
           
            this.store.pushPayload(response);
            yield this.confirm();
            this.send('closeModal');
        } catch (error) {
            let errMessage = `There was an error regenerating the Personal API Token. Please try again`;
            this.set('errorMessage', errMessage);
            return;
        }
    }).drop()
});
