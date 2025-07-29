import coursesData from "@/services/mockData/courses.json";

// Add delay for realistic loading experience
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CourseService {
  async getAll() {
    await delay(300);
    return [...coursesData];
  }

  async getById(id) {
    await delay(200);
    const course = coursesData.find(course => course.Id === parseInt(id));
    if (!course) {
      throw new Error("강의를 찾을 수 없습니다.");
    }
    return { ...course };
  }

  async getFeatured(limit = 6) {
    await delay(250);
    return [...coursesData]
      .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
      .slice(0, limit);
  }

  async searchCourses(query) {
    await delay(300);
    if (!query) return this.getAll();
    
    const lowercaseQuery = query.toLowerCase();
    return coursesData.filter(course =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.instructor.toLowerCase().includes(lowercaseQuery)
    );
  }

  async create(courseData) {
    await delay(400);
    const maxId = Math.max(...coursesData.map(c => c.Id), 0);
    const newCourse = {
      Id: maxId + 1,
      ...courseData,
      enrollmentCount: 0
    };
    coursesData.push(newCourse);
    return { ...newCourse };
  }

  async update(id, updateData) {
    await delay(300);
    const index = coursesData.findIndex(course => course.Id === parseInt(id));
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다.");
    }
    coursesData[index] = { ...coursesData[index], ...updateData };
    return { ...coursesData[index] };
  }

  async delete(id) {
    await delay(300);
    const index = coursesData.findIndex(course => course.Id === parseInt(id));
    if (index === -1) {
      throw new Error("강의를 찾을 수 없습니다.");
    }
    const deletedCourse = coursesData.splice(index, 1)[0];
    return { ...deletedCourse };
  }
}

export default new CourseService();