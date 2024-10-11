export interface ResponseConfig {
  status: 200 | 300 | 400;
  message: string;
}

export interface userAuthResponse extends ResponseConfig {
  userCredentials?: userMetaInterface;
}

export interface SearchPageResponse extends ResponseConfig {
  resultDocs: SearchableDocs[] | null;
}
export interface CommentsResponse extends ResponseConfig {
  comments?: CommentsInterface[];
}

export interface userProfileResponse extends ResponseConfig {
  userData?: {
    userDetails: profileUserInterface;
    userPosts: postInterface[];
  };
}

export interface usernameSuggestInterface extends ResponseConfig {
  usernames: string[];
}

export interface CommentsInterface {
  comment: string;
  comment_id: string;
  comment_time: string;
  comment_user: string;
  has_replies?: Omit<CommentsInterface, "post_name">[] | [];
  post_name: string;
  comment_reply?: string;
}

export interface LikesInterface {
  post_name: string;
  likes_count: number;
  liked_by: string[];
  post_author: string;
}

export interface getPostsInterface extends ResponseConfig {
  postData?: postInterface[];
  allUsernames?: { name: string; uid: string }[];
}

export interface reelsResponseInterface extends ResponseConfig {
  reelsData: reelVideoInterface[];
}

export interface getSinglePostInterface extends ResponseConfig {
  postData?: postInterface;
}

export interface userInterface {
  account_type: "personal" | "professional" | "";
  uid: string;
  username: string;
  display_name: string;
  email: string;
  phone_number: string;
  profile_url: string;
  company_name?: string;
  district?: string;
  state?: string;
  isVerified?: boolean;
  bio?: string;
}

export interface userMetaInterface extends userInterface {
  meta_data: metadata;
}

export const dummyUser: userMetaInterface = {
  account_type: "",  // Can be "personal" or "professional"
  uid: "",
  username: "",
  display_name: "",
  email: "",
  phone_number: "",
  profile_url: "",
  meta_data: {
    cred: {
      email: "",
      uid: "",
      createdAt: "",
    },
    userConnections: {
      following: [],
      followingCount: 0,  // Placeholder count
    },

  }
};


export interface profileUserInterface extends userInterface {
  followers: string[];
  following: string[];
  followersCount: number;
  followingCount: number;
  reviews?: reviewInterface[];
}

export const userInterfaceCount = 11;

export interface metadata {
  cred: {
    email: string;
    uid: string;
    createdAt: string;
  };
  userConnections: {
    followers?: string[];
    following: string[];
    followersCount?: number;
    followingCount: number;
  };
  reviews?: reviewInterface[];
}

export interface personalUserInterface {
  account_type: "personal" | "professional";
  uid: string;
  username: string;
  display_name: string;
  email: string;
  profile_url: string;
  phone_number: string;
}

export interface postInterface {
  caption: string;
  photo_url: string[] | null;
  post_name: string;
  time: string;
  uid: string;
  username: string;
  profile_url?: string;
  likes_count?: number;
  liked_by?: string[];
  numeric_time: number;
}

export interface postVideoInterface extends Omit<postInterface, "photo_url"> {
  video_url: string | null;
}

export interface reelVideoInterface extends postVideoInterface {
  profile_url: string;
  display_name: string;
}

export interface SearchableDocs {
  uid: string;
  username: string;
  display_name: string;
  profile_url: string;
  company_name: string;
  district: string;
  state: string;
  bio: string;
}

export interface reviewInterface {
  from?: string;
  to?: string;
  rating: number;
}
