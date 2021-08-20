export interface SocialMediaRequest<T> {
  feed(): Promise<T>;
}
