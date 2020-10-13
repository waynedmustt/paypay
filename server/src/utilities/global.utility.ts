export class GlobalUtility {
  static _instance: GlobalUtility;

  static getInstance(): GlobalUtility {
    if (!GlobalUtility._instance) {
      return (GlobalUtility._instance = new GlobalUtility());
    }

    return GlobalUtility._instance;
  }

  enforceBoolean(data) {
    if (typeof data === 'boolean') {
      return data;
    }

    if (data === 'true') {
      return true;
    }

    if (data === 'false') {
      return false;
    }
  }

  enforceArray(data): any[] {
    if (Array.isArray(data)) {
      return data;
    }

    if (typeof data === 'undefined') {
      return [];
    }

    return [data];
  }

  isEmptyObject(data) {
    const param = data || {};
    return Object.keys(param).length === 0;
  }
}
