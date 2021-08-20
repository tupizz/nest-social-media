export interface SocialMediaRequest<T> {
  URL: string;
  feed(): Promise<T>;
}
