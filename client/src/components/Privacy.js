import React from "react";
import { useEffect } from "react";
import Footer from "./Footer.js";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div id="privacy">
        <h2>Privacy Policy</h2>
        <p>
          You can review the most current version of the Privacy Policy at any
          time on this page. We reserve the right to update, change or replace
          any part of the Privacy Policy by posting updates and/or changes to
          our website. It is your responsibility to check this page periodically
          for changes. Your continued use of or access to the website following
          the posting of any changes constitutes acceptance of those changes.
        </p>
        <p>
          This policy is effective as of 12 May 2021 and was last updated on 12
          May 2021.
        </p>
        <h3>Information We Collect</h3>
        <p>
          Information we collect includes both information you knowingly and
          actively provide us when using or participating in any of our services
          and promotions, and any information automatically sent by your devices
          in the course of accessing our products and services.
        </p>
        <h4>Log Data</h4>
        <p>
          When you visit our website, our servers may automatically log the
          standard data provided by your web browser. It may include your
          device’s IP address, browser type and version, the pages you visit,
          the time and date of your visit, the time spent on each page, other
          details about your visit, and technical details that occur in
          conjunction with any errors you may encounter.
        </p>
        <p>
          Please be aware that while this information may not be personally
          identifying by itself, it may be possible to combine it with other
          data to personally identify individual persons.
        </p>
        <h4>Personal Information</h4>
        <p>
          We may ask for personal information which may include one or more of
          the following:
        </p>
        <ul>
          <li>Email</li>
          <li>Billing information</li>
        </ul>
        <h4>Collection and Use of Information</h4>
        <p>
          We may collect personal information from you when you do any of the
          following on our website:
        </p>
        <ul>
          <li>Use a mobile device or web browser to access our content</li>
          <li>
            Contact us via email, social media, or on any similar technologies
          </li>
          <li>When you mention us on social media</li>
        </ul>
        <p>
          We may collect, hold, use, and disclose information for the following
          purposes, and personal information will not be further processed in a
          manner that is incompatible with these purposes:
        </p>
        <ul>
          <li>to contact and communicate with you</li>
          <li>
            for analytics, market research, and business development, including
            to operate and improve our website, associated applications, and
            associated social media platforms
          </li>
          <li>
            to enable you to access and use our website, associated
            applications, and associated social media platforms
          </li>
          <li>for internal record keeping and administrative purposes</li>
          <li>
            to comply with our legal obligations and resolve any disputes that
            we may have
          </li>
        </ul>
        <h3>How Long We Keep Your Personal Information</h3>
        <p>
          We keep your personal information only for as long as we need to. This
          time period may depend on what we are using your information for, in
          accordance with this privacy policy. If your personal information is
          no longer required, we will delete it or make it anonymous by removing
          all details that identify you. However, if necessary, we may retain
          your personal information for our compliance with a legal, accounting,
          or reporting obligation.
        </p>
        <h3>Disclosure of Personal Information to Third Parties</h3>
        <p>
          We may disclose personal information to third party service providers
          for the purpose of enabling them to provide their services, for
          example, IT service providers, data storage, hosting and server
          providers, or Google Analytics
        </p>
        <h3>Use of Cookies</h3>
        <p>
          In addition to third-party cookies from services listed above, we use
          cookies to store your session ID. This allows users to access our
          service without entering a username and password each time to login.
        </p>
        <h3>Contact</h3>
        <p>
          For any questions or concerns regarding your privacy,{" "}
          <a href="mailto:habitastic@protonmail.com">email</a> us.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
