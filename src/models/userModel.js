export function createUserModel(
    id = 0,
    eventId = 0,
    name = '',
    email = '',
    position = '',
    image = '',
    firstTerm = null,
    secondTerm = null,
    isAdmin = false,
    isDeveloper = false,
    isStaff = false,
    groupId = 0,
    codInternal = "",
    password = "",
    company = "",
    user_token = "",
    visibleToChat = true,
    levelId = 0,
    levelName = "",
    points = 0,
    engageCode = "",
    levelPosition = 0,
) {
    const user = {
        id: id,
        eventId: eventId,
        name: name,
        email: email && email !== "" ? email : id.toString(),
        position: position,
        image: image,
        firstTerm: firstTerm,
        secondTerm: secondTerm,
        isAdmin: isAdmin,
        isDeveloper: isDeveloper,
        isStaff: isStaff,
        groupId: groupId ? groupId : 0,
        codInternal: codInternal,
        hasPassword: password && password !== "" ? true : false,
        company: company,
        user_token: user_token,
        visibleToChat: visibleToChat === undefined || visibleToChat === null || visibleToChat === true ? true : false,
        levelId: levelId,
        levelName: levelName,
        points: points,
        engageCode: engageCode,
        levelPosition: levelPosition,
    }

    return user;
}