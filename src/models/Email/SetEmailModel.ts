import EtherealEmailModel from './EtherealEmailModel';
import GoogleEmailModel from './GoogleEmailModel';

export default interface SetEmailModel {
    environment: string;
    googleEmail?: GoogleEmailModel;
    etherealEmail?: EtherealEmailModel
}
