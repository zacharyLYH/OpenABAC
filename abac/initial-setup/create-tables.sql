CREATE TABLE Action (
    id CHAR(36) NOT NULL,
    actionName VARCHAR(255) NOT NULL,
    actionDescription VARCHAR(255),
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY (actionName)
);

CREATE TABLE Policy (
    id CHAR(36) NOT NULL,
    policyName VARCHAR(255) NOT NULL,
    policyDescription VARCHAR(255),
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    allow BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE (policyName)
);

-- User Table
CREATE TABLE User (
    id CHAR(36) NOT NULL,
    applicationUserId VARCHAR(255) NOT NULL,
    jsonCol JSON,
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE INDEX applicationUserId_idx (applicationUserId)
);

-- UserPolicy Table
CREATE TABLE UserPolicy (
    id CHAR(36) NOT NULL,
    abacId CHAR(36) NOT NULL, -- Refers to User.id
    policyId CHAR(36) NOT NULL,
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX (abacId)
);

-- PolicyAction Table
CREATE TABLE PolicyAction (
    id CHAR(36) NOT NULL,
    actionId CHAR(36) NOT NULL,
    policyId CHAR(36) NOT NULL,
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX (policyId)
);

-- ActionContext Table
CREATE TABLE ActionContext (
    id CHAR(36) NOT NULL,
    actionId CHAR(36) NOT NULL,
    contextId CHAR(36) NOT NULL,
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX (actionId)
);

-- Context Table
CREATE TABLE Context (
    id CHAR(36) NOT NULL,
    contextName VARCHAR(255), 
    contextDescription VARCHAR(255),
    operator VARCHAR(255) NOT NULL,
    entity VARCHAR(255) NOT NULL,
    textValue TEXT,
    timeValue1 VARCHAR(255),
    timeValue2 VARCHAR(255),
    modifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE INDEX contextName_idx (contextName)
);

CREATE TABLE Statistics (
    id CHAR(36) NOT NULL,
    statisticName VARCHAR(255),
    statisticNumberValue INT,
    statisticVarCharValue VARCHAR(255),
    statisticBooleanValue BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE Lucia_User (
    id CHAR(36) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX username_idx (username)
);

CREATE TABLE Lucia_User_Session (
    id CHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Lucia_User(id)
);
