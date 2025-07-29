import usersData from "@/services/mockData/users.json";

// Add delay for realistic loading experience
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserService {
  async getAll() {
    await delay(300);
    return [...usersData];
  }

  async getById(id) {
    await delay(200);
    const user = usersData.find(user => user.Id === parseInt(id));
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    return { ...user };
  }

  async getCurrentUser() {
    await delay(200);
    // Return first user as current user for demo purposes
    return { ...usersData[0] };
  }

  async updateProfile(id, updateData) {
    await delay(300);
    const index = usersData.findIndex(user => user.Id === parseInt(id));
    if (index === -1) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    usersData[index] = { ...usersData[index], ...updateData };
    return { ...usersData[index] };
  }

  async enrollCourse(userId, courseId) {
    await delay(300);
    const user = usersData.find(user => user.Id === parseInt(userId));
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    
    if (!user.enrolledCourses.includes(parseInt(courseId))) {
      user.enrolledCourses.push(parseInt(courseId));
    }
    
    return { ...user };
  }

  async unenrollCourse(userId, courseId) {
    await delay(300);
    const user = usersData.find(user => user.Id === parseInt(userId));
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    
    user.enrolledCourses = user.enrolledCourses.filter(id => id !== parseInt(courseId));
    return { ...user };
  }

  async registerUser(userData) {
    await delay(500);
    
    // Check if email already exists
    const existingUser = usersData.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error("이미 사용 중인 이메일입니다.");
    }

    // Generate new ID
    const newId = Math.max(...usersData.map(user => user.Id), 0) + 1;
    
    // Create new user object
    const newUser = {
      Id: newId,
      name: userData.fullName,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      membershipTier: userData.membershipTier,
      enrolledCourses: [],
      profileImage: null,
      joinDate: new Date().toISOString(),
      acceptedTerms: userData.acceptTerms
    };

    // Add to mock data
    usersData.push(newUser);
    
    return { ...newUser };
  }
}
// Create and export service instance
const userService = new UserService();
export default userService;