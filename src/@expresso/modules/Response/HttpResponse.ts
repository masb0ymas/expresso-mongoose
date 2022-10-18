import { i18nConfig } from '@config/i18nextConfig'
import { ReqOptions } from '@expresso/interfaces/ReqOptions'
import { TOptions } from 'i18next'

type DataResponseEntity<TData> = {
  message?: string
  code?: number
} & TData

type DtoHttpResponse<TData> = {
  code: number
  message: string
} & Omit<DataResponseEntity<TData>, 'message' | 'code'>

class HttpResponse {
  /**
   * Base Response
   * @param dataResponse
   * @returns
   */
  private static baseResponse<TData>(
    dataResponse: DataResponseEntity<TData>
  ): DtoHttpResponse<TData> {
    const {
      message = 'data has been received',
      code = 200,
      ...rest
    } = dataResponse

    return { code, message, ...rest }
  }

  /**
   * Response Get or Sucess
   * @param dataResponse
   * @param options
   * @returns
   */
  public static get<TData>(
    dataResponse: DataResponseEntity<TData>,
    options?: ReqOptions
  ): DtoHttpResponse<TData> {
    const i18nOpt: string | TOptions = { lng: options?.lang }
    const message = i18nConfig.t('success.data_received', i18nOpt)

    return this.baseResponse({ message, ...dataResponse })
  }

  /**
   * Response Created
   * @param dataResponse
   * @param options
   * @returns
   */
  public static created<TData>(
    dataResponse: DataResponseEntity<TData>,
    options?: ReqOptions
  ): DtoHttpResponse<TData> {
    const i18nOpt: string | TOptions = { lng: options?.lang }
    const message = i18nConfig.t('success.data_added', i18nOpt)

    return this.baseResponse({ code: 201, message, ...dataResponse })
  }

  /**
   * Response Updated
   * @param dataResponse
   * @param options
   * @returns
   */
  public static updated<TData>(
    dataResponse: DataResponseEntity<TData>,
    options?: ReqOptions
  ): DtoHttpResponse<TData> {
    const i18nOpt: string | TOptions = { lng: options?.lang }
    const message = i18nConfig.t('success.data_updated', i18nOpt)

    return this.baseResponse({ message, ...dataResponse })
  }

  /**
   * Response Deleted
   * @param dataResponse
   * @param options
   * @returns
   */
  public static deleted<TData>(
    dataResponse: DataResponseEntity<TData>,
    options?: ReqOptions
  ): DtoHttpResponse<TData> {
    const i18nOpt: string | TOptions = { lng: options?.lang }
    const message = i18nConfig.t('success.data_deleted', i18nOpt)

    return this.baseResponse({ message, ...dataResponse })
  }
}

export default HttpResponse
