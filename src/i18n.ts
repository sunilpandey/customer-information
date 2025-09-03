// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Bind i18next to React
  .init({
    resources: {
      en: {
        translation: {
          'greeting': 'Hello, {{name}}!',
          'search_placeholder': 'Search...',
          'search_company': 'Search Company...',
          'Total_Customers': 'Total Customers',
          'Members': 'Members',
          'Active_Now': 'Active Now',
          'All_Customers': 'All Customers',
          'Active_Members': 'Active Members',
          'Search_company': 'Search Company...',
          'Sort_By': 'Sort By',
          'Newest': 'Newest',
          'Oldest': 'Oldest',
          'Showing_data': 'Showing data',
          'of': 'of',
          'entries': 'entries',
          'Dashboard': 'Dashboard',
          'Products': 'Products',
          'Income': 'Income',
          'Promote': 'Promote',
          'Help': 'Help',
          'Name': 'Name',
          'Company': 'Company',
          'Phone': 'Phone',
          'Email': 'Email',
          'Country': 'Country',
          'Status': 'Status'
        }
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback if translation is missing
    interpolation: {
      escapeValue: false // React handles XSS safety
    }
  });

export default i18n;