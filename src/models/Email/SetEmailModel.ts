import EtherealEmailModel from './EtherealEmailModel';
import GoogleEmailModel from './GoogleEmailModel';

export default interface SetEmailModel {
    environment: "google" | "ethereal";
    googleEmail?: GoogleEmailModel;
    etherealEmail?: EtherealEmailModel
}
