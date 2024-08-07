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

export interface CommentsInterface {

  comment:string;
  comment_id:string;
  comment_time:string;
  comment_user:string;
  has_replies?:CommentsInterface[]|[],
  post_id:string;
  comment_reply?:string;

}


export interface getPostsInterface extends ResponseConfig {
  postData?:postInterface[],
  allUsernames?:string[]
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
}

export interface postInterface {
  caption: string;
  photo_url: string;
  post_name: string;
  time: string;
  uid: string;
  username: string;
  profile_url?: string;
}


