import { Image } from 'react-native';
import firebase from '../database/firebase';
import icon from "../assets/images/new-icon.png";

const db = firebase.firestore();
const iconUri = Image.resolveAssetSource(icon).uri

export { db, iconUri } ;
