-- Triggers for UUID generation
DELIMITER //

CREATE TRIGGER before_insert_action
BEFORE INSERT ON Action FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_policy
BEFORE INSERT ON Policy FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_user
BEFORE INSERT ON User FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_userpolicy
BEFORE INSERT ON UserPolicy FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_policyaction
BEFORE INSERT ON PolicyAction FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_actioncontext
BEFORE INSERT ON ActionContext FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_incompatibleactiontoaction
BEFORE INSERT ON IncompatibleActionToAction FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_incompatiblepolicytopolicy
BEFORE INSERT ON IncompatiblePolicyToPolicy FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

CREATE TRIGGER before_insert_context
BEFORE INSERT ON Context FOR EACH ROW
BEGIN
    IF NEW.id IS NULL THEN
        SET NEW.id = UUID();
    END IF;
END;

//
DELIMITER ;