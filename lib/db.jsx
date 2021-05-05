import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics';
import 'firebase/auth';



  module.exports = {
    // 本来、initializeAppによる初期化は一度きりのため、
    // 初期化の結果のみを切り出してexportする
    db
  };