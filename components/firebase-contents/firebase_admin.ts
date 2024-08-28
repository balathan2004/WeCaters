// Import the functions you need from the SDKs you need
const admin = require("firebase-admin");
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";

const service_account = {
  type: "service_account",
  project_id: "caters-a782b",
  private_key_id: "4cb63b00e69e719cbc200f66010b73640b9871af",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTw2rDp5RUAWc8\n+eqh8E0WFhKB5sd0vzeT3HLLi3N9O4z2ZbCsRYXDN9lT1VCKxjRIVxOVf3Vz+Pmv\nm6ulMSeiC/nKEgQWMLE/LUmAgFFEXyhmJGmFQkg2r0iKyGsE+MTJPYT1ho6nFqri\nB3gD+8gtgeLyTc6m9VUFdWqX+H2/Gr6VPNJraugjXNYQnVj0WYs+39KfwObJX+MV\neleQ6/qCYbwGUpB1TKRTEmFOl2bZe4nww2kAgjJWsmFqVH2LDUkQDCPAplSwlm2R\nt6OGNDT0fvxJYb0o+u0IzHsII/5en85fmwJaBdMity7iKthM9C30vWjOILk4CpB7\nVqDtx2WnAgMBAAECggEAQbElDSYO1xKKXrmepnbfywK04hRf+qEZEib4e5k6jfZr\nz8ITERYOHVXVdvK9Jhe/f1N38VAVdREfD/GISVoa0+PILP3yw5l+Wr1nSFRGIaIt\na6ZPD7ZUpZYxuE/dFzE/BritZudDmKTpBO5RNlckra1V5FnryhJgOi3HD/bXt3D5\ncQ+1CWWmLMOT/x0OeKQ3cC925eS4wGkNEH+zUKkEBqao6VwWx13PYwg5dQVDKAq3\nF/PT2fY1IDWBdJBWewfysA1YoFLwvFrdkHa/OWGDjeRFzuCWr2Kvear7erdZv258\n/Yl4YHuR5BjlOKeJfiF/OzQN6Rzk9JdhtJYS6CneOQKBgQDxiNqvNN7hu64vrNQG\n2QS32v00xUOwncDTtqptHz6kWKQs+xPcwzHYYTyPnkdnQnX2+R2b/ERaH2jSZCCr\nFCH6pbH9w5foOkQq/3Ww1QfMfDNBsr1rcOUKSG7tveWZXzs8HfRWF5iRtB3jAl/z\nE5WzgJXX3g1t8H7mITL+r6NxDwKBgQDgch4tf9X9MfMG75gEGOrqA0ZjO8xGQUG5\nBuX6q6VoWZf9b+EpP4X9DIDmOra7z2KDagvV6/UTJa6jZAo+OLWuTYqZj7A6pRSE\nPyJqXTOF+VVsEDfYaKt9+U5/FXXmcGIq0ELm41buhLgeDTO6QiOzdG8syssMDKFJ\nz23tGUSR6QKBgCFcYbgpeU98eMak/HQlrX0nhimvxXWzlFqptEh2NFTG2YZM96Va\nYJwechr0JbChgWGnbuuIoHhCNlw48DoxAbB5Cmieh3DP+3Jk7oCKLBWWYg4E/hzE\n7x3Ie2ni/L9+Y9Qd3w21HKGjWy1ruoz8e4TbkdbLGNfCjASFOWHsKIsJAoGBAJVS\nNtOMdgBiR844folTTo5rqVuBwBCJf8EqXrzbj0sSODUrRsBbe7fzppoFO+dNPLwz\nRDaJKd4YNsyLVOk6b1zMR8aMOvF5PGITYsEiypF6ZSNk0tKOKHHB+EBCNdMet6DG\nN4xGeWJsN9X+cIidUgUlFIXXUSjuCiwB7Z9NLTppAoGADiibVKcUruMqlOjGBDil\n6cCmStOc7bhxgm0iFxKDKKTXSw0/yd8faa7wo1BHNtc8NQMU3gECWl79okNqt7qe\nd0pqLc2xPzwDhD6r1QtXTahkNVDCqi43X7R7yloFlLNJNnJB4Iz1P1uX32poIAzZ\nYCdEcksAcyLzBoff5Rqd+q0=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-jpayh@caters-a782b.iam.gserviceaccount.com",
  client_id: "116969845589412872089",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jpayh%40caters-a782b.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase
const app_admin = admin.initializeApp(
  { credential: admin.credential.cert(service_account) },
  "admin_account"
);
const firestore_admin = getFirestore(app_admin);
const storage_admin = getStorage(app_admin);
const auth_admin = getAuth(app_admin);

export { app_admin, firestore_admin, storage_admin, auth_admin };
