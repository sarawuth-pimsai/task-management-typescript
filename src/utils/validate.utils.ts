export default class ValidateUtil {
  static userId(userId: string): boolean {
    const regex = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/,
      'i'
    )
    if (!!userId && regex.test(userId)) {
      return true
    }
    return false
  }
  static taskId(taskId: string): boolean {
    const regex = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/,
      'i'
    )
    if (!!taskId && regex.test(taskId)) {
      return true
    }
    return false
  }
}
