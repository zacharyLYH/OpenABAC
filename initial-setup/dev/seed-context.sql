INSERT INTO Context (id, contextName, contextDescription, operator, entity, textValue, timeValue1, timeValue2) VALUES 
(UUID(), 'ServerRoomBusinessHours', 'Access to server room during business hours', 'BETWEEN', 'ServerRoomAccess', NULL, '09:00:00', '17:00:00'),
(UUID(), 'DevServerNoMaintenanceAccess', 'No access to development servers during maintenance', 'NOT BETWEEN', 'DevServerMaintenance', NULL, '02:00:00', '04:00:00'),
(UUID(), 'ProjectResourcesMainOfficeAccess', 'Access to project resources from main office', 'IN', 'ProjectLocationAccess', 'MainOffice', NULL, NULL),
(UUID(), 'ProjectSpecificRegionsAccess', 'Project access restricted to specific regions', 'IN', 'ProjectRegionalAccess', 'US,EU,JP', NULL, NULL),
(UUID(), 'UserDataAccessForAdmins', 'Only administrators can access user data', '==', 'UserDataAccess', 'Administrator', NULL, NULL),
(UUID(), 'FinancialRecordsNoInternAccess', 'Interns cannot access financial records', '!=', 'FinancialRecordAccess', 'Intern', NULL, NULL),
(UUID(), 'ConfidentialProjectDocsReadAccess', 'Read access to confidential project documents', '==', 'ProjectDocType', 'Confidential', NULL, NULL),
(UUID(), 'PublicDocsEditAccess', 'Edit access to public documentation', '==', 'PublicDocEdit', 'Public', NULL, NULL),
(UUID(), 'HighSensitivityDBAccess', 'Access to highly sensitive database', '==', 'DatabaseSensitivity', 'High', NULL, NULL),
(UUID(), 'LowSensitivityDBAccess', 'Access to less sensitive database', '==', 'DatabaseSensitivity', 'Low', NULL, NULL),
(UUID(), 'RegularEmployeeExpenseLimit', 'Expense approval limit for regular employees', '<=', 'ExpenseLimit', NULL, '1000', NULL),
(UUID(), 'ManagerExpenseLimit', 'Expense approval limit for managers', '<=', 'ExpenseLimit', NULL, '5000', NULL),
(UUID(), 'ActiveEmployeeAccountAccess', 'System access for active employee accounts', '==', 'EmployeeAccountStatus', 'Active', NULL, NULL),
(UUID(), 'SuspendedEmployeeAccountNoAccess', 'No system access for suspended employee accounts', '==', 'EmployeeAccountStatus', 'Suspended', NULL, NULL),
(UUID(), 'CompanyDeviceAppAccess', 'Application access from company-issued devices', 'IN', 'DeviceTypeAccess', 'Laptop,Desktop', NULL, NULL),
(UUID(), 'PersonalMobileDeviceAppRestriction', 'Restrict application access to personal mobile devices', 'IN', 'DeviceTypeAccess', 'Smartphone,Tablet', NULL, NULL),
(UUID(), 'AppVersion5FeatureAccess', 'Feature available in app version 5.0 and above', '>=', 'FeatureAppVersion', NULL, '5.0', NULL),
(UUID(), 'BelowAppVersion5FeatureNoAccess', 'Feature not available in app versions below 5.0', '<', 'FeatureAppVersion', NULL, '5.0', NULL),
(UUID(), 'UserActivityLastMonthAccess', 'Project access for users active within the last month', '>', 'UserLastActivity', NULL, '2023-01-01 00:00:00', NULL),
(UUID(), 'UserInactivityOver6MonthsNoAccess', 'No project access for users inactive for over 6 months', '<', 'UserLastActivity', NULL, '2022-07-01 00:00:00', NULL),
(UUID(), 'EngineeringProductTeamToolAccess', 'Tool access for engineering and product teams', 'IN', 'UserGroupToolAccess', 'Engineering,Product', NULL, NULL),
(UUID(), 'ConsultantGroupToolAccess', 'Tool access for external consultant groups', 'IN', 'UserGroupToolAccess', 'Consultants', NULL, NULL),
(UUID(), 'ProjectAlphaResourceAccess', 'Access to resources for Project Alpha', '==', 'ProjectResourceAccess', 'Alpha', NULL, NULL),
(UUID(), 'ProjectBetaResourceNoAccess', 'No access to resources for Project Beta', '!=', 'ProjectResourceAccess', 'Beta', NULL, NULL),
(UUID(), 'PermanentEmployeeFullToolAccess', 'Full tool access for permanent employees', '==', 'EmployeeContractType', 'Permanent', NULL, NULL),
(UUID(), 'NonEnterpriseContractUserRestriction', 'Restriction for non-enterprise contract users', '!=', 'ContractType', 'Enterprise', NULL, NULL),
(UUID(), 'HighSecurityClearanceAccess', 'Access for high-security clearance', '>=', 'SecurityClearance', NULL, 'Level3', NULL),
(UUID(), 'LowSecurityClearanceRestriction', 'Restriction for low-security clearance', '<', 'SecurityClearance', NULL, 'Level3', NULL),
(UUID(), 'CloudInfrastructureManagementAccess', 'Access for cloud infrastructure management', '==', 'InfrastructureRole', 'CloudAdmin', NULL, NULL),
(UUID(), 'CriticalServerAccessRestriction', 'Restriction from critical server access', '!=', 'ServerAccess', 'Critical', NULL, NULL),
(UUID(), 'DevEnvAccess', 'Access to development environment', 'IN', 'EnvironmentAccess', 'Development,Staging', NULL, NULL),
(UUID(), 'ProdEnvAccessRestriction', 'Restriction from production environment', '!=', 'EnvironmentAccess', 'Production', NULL, NULL),
(UUID(), 'TeamLeadAccess', 'Access for team leads', '==', 'UserRole', 'TeamLead', NULL, NULL),
(UUID(), 'EmploymentDurationAccess', 'Access based on employment duration', '>=', 'EmploymentDuration', NULL, '365', NULL),
(UUID(), 'FinancialRecordsAccess', 'Access to financial records', '==', 'DataAccess', 'Financial', NULL, NULL),
(UUID(), 'HRRecordsRestriction', 'Restriction from HR records', '!=', 'DataAccess', 'HR', NULL, NULL),
(UUID(), 'OnSiteEmployeeAccess', 'Access for on-site employees', '==', 'EmployeeType', 'OnSite', NULL, NULL),
(UUID(), 'RemoteEmployeeRestriction', 'Restriction for remote employees', '==', 'EmployeeType', 'Remote', NULL, NULL);
