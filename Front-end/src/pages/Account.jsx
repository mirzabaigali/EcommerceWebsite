import React, { useState } from "react";
import EcomHomePage from "./EcomHomePage";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import "./Account.css";

const Account = () => {
  const breadcrumbItems = [{ text: "Home", link: "/" }, { text: "Account" }];
  const [activeTab, setActiveTab] = useState("v-pills-home");
  const name = localStorage.getItem("userName");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <header>
        <EcomHomePage />
      </header>
      <main>
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-baseline">
            <Breadcrumb items={breadcrumbItems} />
            <div>
              Welcome <span className="account-name">{name}.</span>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-md-3">
              <p>Manage My Account</p>
              <div
                className="nav flex-column nav-pills ms-4"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <p
                  className={`account-tabs ${
                    activeTab === "v-pills-home" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("v-pills-home")}
                  role="tab"
                >
                  My Profile
                </p>
                <p
                  className={`account-tabs ${
                    activeTab === "v-pills-profile" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("v-pills-profile")}
                  role="tab"
                >
                  Address Book
                </p>
                <p
                  className={`account-tabs ${
                    activeTab === "v-pills-messages" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("v-pills-messages")}
                  role="tab"
                >
                  My Payment Options
                </p>
              </div>
              <p>My Orders</p>
              <div
                className="nav flex-column nav-pills ms-4"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <p
                  className={`account-tabs ${
                    activeTab === "v-pills-returns" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("v-pills-returns")}
                  role="tab"
                >
                  My Returns
                </p>
                <p
                  className={`account-tabs ${
                    activeTab === "v-pills-cancellations" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("v-pills-cancellations")}
                  role="tab"
                >
                  My Cancellations
                </p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className={`tab-pane fade show ${
                    activeTab === "v-pills-home" ? "active" : ""
                  }`}
                  id="v-pills-home"
                  role="tabpanel"
                >
                  <div className="myprofile mt-4">
                    <p className="account-name pt-3 ps-3">Edit Your Profile</p>
                    <div className="row mt-2 ms-1">
                      <div className="col-6">
                        <label className="account-label" htmlFor="first">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first"
                          id="first"
                          className="form-control myprofile-input"
                          placeholder="Md"
                        />
                      </div>
                      <div className="col-6">
                        <label className="account-label" htmlFor="last">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last"
                          id="last"
                          className="form-control myprofile-input"
                          placeholder="Rimel"
                        />
                      </div>
                      <div className="col-6">
                        <label className="account-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="form-control myprofile-input"
                          placeholder="rimel1111@gmail.com"
                        />
                      </div>
                      <div className="col-6">
                        <label className="account-label" htmlFor="address">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="form-control myprofile-input"
                          placeholder="Kingston, 5236, United State"
                        />
                      </div>
                      <div className="col-12">
                        <label className="account-label" htmlFor="curent">
                          Password Changes
                        </label>
                        <input
                          type="text"
                          name="curent"
                          id="curent"
                          placeholder="Current Password"
                          className="form-control myprofile-input1"
                        />
                        <input
                          type="text"
                          name="curent"
                          id="curent"
                          placeholder="New Password"
                          className="form-control myprofile-input1"
                        />
                        <input
                          type="text"
                          name="curent"
                          id="curent"
                          placeholder="Confirm new Password"
                          className="form-control myprofile-input1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane fade show ${
                    activeTab === "v-pills-profile" ? "active" : ""
                  }`}
                  id="v-pills-profile"
                  role="tabpanel"
                >
                  Profile
                </div>
                <div
                  className={`tab-pane fade show ${
                    activeTab === "v-pills-messages" ? "active" : ""
                  }`}
                  id="v-pills-messages"
                  role="tabpanel"
                >
                  Messages
                </div>
                <div
                  className={`tab-pane fade show ${
                    activeTab === "v-pills-returns" ? "active" : ""
                  }`}
                  id="v-pills-returns"
                  role="tabpanel"
                >
                  Returns
                </div>
                <div
                  className={`tab-pane fade show ${
                    activeTab === "v-pills-cancellations" ? "active" : ""
                  }`}
                  id="v-pills-cancellations"
                  role="tabpanel"
                >
                  Cancellations
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  );
};

export default Account;
