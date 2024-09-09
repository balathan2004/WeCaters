export interface ResponseConfig {
  status: 200 | 300 | 400;
  message: string;
}

export interface userAuthResponse extends ResponseConfig {
  userCredentials?: userInterface;
}

export interface CommentsResponse extends ResponseConfig{
  comments?: CommentsInterface[]
}

export interface userProfileResponse extends ResponseConfig{
userData?:{
  userDetails:userInterface,
  userPosts:postInterface[]
}
}

export interface usernameSuggestInterface extends ResponseConfig{
  usernames:string[]
}


export interface CommentsInterface {
  comment:string;
  comment_id:string;
  comment_time:string;
  comment_user:string;
  has_replies?:Omit<CommentsInterface,"post_name">[]|[],
  post_name:string;
  comment_reply?:string;
}

export interface LikesInterface{
  post_name:string;
  likes_count:number;
  liked_by:string[];
  post_author:string;
}


export interface getPostsInterface extends ResponseConfig {
  postData?:postInterface[],
  allUsernames?:{ name: string; uid: string; }[]
}


export interface getSinglePostInterface extends ResponseConfig {
  postData?:postInterface,
}

export interface userInterface {
  account_type: "personal" | "professional";
  uid: string;
  username: string;
  display_name: string;
  email: string;
  phone_number: string;
  profile_url: string;
  company_name?: string;
  district?: string;
  state?: string;
  isVerified?:boolean;
  bio?: string;
}

export const userInterfaceCount=11


export interface personalUserInterface{
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
  profile_url?: string ;
  likes_count?: number;
  liked_by?: string[];
  numeric_time: number;
}


