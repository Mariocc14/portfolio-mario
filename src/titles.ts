/* Page titles shared by the prerendered <head> (seo.ts) and the runtime document.title
   set by each page component. Kept in their own module so the components do not import
   seo.ts, which imports the routes, which import the components. */
export const HOME_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";
export const INFO_TITLE = "About Mario Calvo — CRM & Lifecycle Marketing";
export const RESOURCES_TITLE = "Email Deliverability & CRM Guides — Mario Calvo";
