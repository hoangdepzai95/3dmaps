import I18n from 'i18n-js';
import { Util } from 'expo';

function setUpI18n(locale) {
  I18n.locale = locale;
  I18n.translations = {
    en_US: {
      HOME: 'HOME',
      Search: 'Search',
      EXPERIENCE: 'EXPERIENCE',
      MAP: 'MAP',
      FILTER: 'FILTER',
      FILTERS: 'FILTERS',
      Place: 'Place',
      Experience: 'Experience',
      RESET: 'RESET',
      SEE_ALL: 'SEE ALL',
      NEW_BOARD: 'NEW_BOARD',
      Title: 'Title',
      Setting: 'Setting',
      Private: 'Private',
      Public: 'Public',
      IMAGES: 'IMAGES',
      COMMENTS: 'COMMENTS',
      Suggested_Places: 'Suggested Places',
      Suggested_Experience: 'Suggested_Experience',
      PROFILE: 'PROFILE',
      Sign_in_with_Facebook: 'Sign in with Facebook',
      Sign_in_with_Google: 'Sign in with Google',
      ACCOUNT_SETTINGS: 'ACCOUNT SETTINGS',
      HELP_AND_SUPPORT: 'HELP & SUPPORT',
      SAVED_CONTENTS: 'SAVED CONTENTS',
      SAVE_TO: 'SAVE TO',
      INVITE_FRIEND: 'INVITE FRIEND',
      CREATE_NEW: 'CREATE NEW',
      '3D_MAPS': '3D MAPS',
      SAVED: 'SAVED',
      Skip_Login: 'Skip Login',
      COPYRIGHT_TEXT: 'Toan Dung Media, All Rights Reserved',
      NETWORK_ERROR_MESSAGE: 'Error! Please check your internet connection or restart',
    },
    vi_VN: {
      HOME: 'TRANG CHỦ',
      Search: 'Tìm kiếm',
      EXPERIENCE: 'TRẢI NGHIỆM',
      MAP: 'BẢN ĐỒ',
      FILTER: 'BỘ LỌC',
      FILTERS: 'BỘ LỌC',
      Place: 'Đia điểm',
      Experience: 'Trải nghiệm',
      RESET: 'THIẾT LẬP LẠI',
      SEE_ALL: 'XEM TẤT CẢ',
      NEW_BOARD: 'BẢNG LƯU MỚI',
      Title: 'Tên',
      Setting: 'Tùy chọn cài đặt',
      Private: 'Riêng tư',
      Public: 'Công khai',
      IMAGES: 'HÌNH ẢNH',
      COMMENTS: 'BÌNH LUẬN',
      Suggested_Places: 'Địa điểm gợi ý',
      Suggested_Experience: 'Trải nghiệm gợi ý',
      PROFILE: 'HỒ SƠ CÁ NHÂN',
      Sign_in_with_Facebook: 'Đăng nhập với Facebook',
      Sign_in_with_Google: 'Đăng nhập với Google',
      ACCOUNT_SETTINGS: 'CÀI ĐẶT TÀI KHOẢN',
      HELP_AND_SUPPORT: 'HỖ TRỢ TÀI KHOẢN',
      SAVED_CONTENTS: 'CÁC NỘI DUNG ĐÃ LƯU',
      SAVE_TO: 'LƯU VÀO',
      INVITE_FRIEND: 'MỜI BẠN BÈ',
      CREATE_NEW: 'TẠO MỚI',
      '3D_MAPS': 'BẢN ĐỒ 3D',
      SAVED: 'ĐÃ LƯU',
      Skip_Login: 'Bỏ qua đăng nhập',
      COPYRIGHT_TEXT: 'Đã đăng kí và bảo hộ bởi Toàn Dũng Media',
      NETWORK_ERROR_MESSAGE: 'Có lỗi xảy ra. Vui lòng kiểm tra kết nối internet hoặc khởi động lại',
    },
  };
}
export default function setUpLang() {
  return Util.getCurrentLocaleAsync().then((locale) => {
    setUpI18n(locale === 'vi_VN' ? locale : 'en_US');
    return locale;
  });
}
