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
}

export default new UserService();