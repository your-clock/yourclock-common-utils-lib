import etherealEmailModel from './EtherealEmailModel';
import googleEmailModel from './GoogleEmailModel';

export default interface setEmailModel {
    environment: string;
    googleEmail?: googleEmailModel;
    etherealEmail?: etherealEmailModel
}
