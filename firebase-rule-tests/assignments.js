const targaryen = require('targaryen/plugins/jasmine');

const customDatabase = {
  courseMembers: {
    course1Id: {
      member1Id: true,
    },
  },
  courses: {
    course1Id: {
      otherFilld: 'otherFilld',
      owner: 'ownerId',
    },
  },
  assignments: {
    course1Id: {
      assignment1Id: {
        title: 'Test Assignment 1',
      },
    },
  },
};

const assignmentsRules = {
  rules: {
    assignments: {
      $courseKey: {
        '.read': "auth != null && root.child('courses/' + $courseKey).exists()",
        '.write':
          "auth != null && root.child('courses/' + $courseKey).exists() && root.child('courses/' + $courseKey + '/owner').val() == auth.uid",
      },
    },
  },
};

describe('Database Rules for Assignments collection', () => {
  beforeEach(() => {
    jasmine.addMatchers(targaryen.matchers);
    targaryen.setFirebaseData(customDatabase);
    targaryen.setFirebaseRules(assignmentsRules);
  });
  it('assignment\'s owner can read & write', function() {
    const auth = { uid: 'ownerId' };
    expect(auth).canRead('/assignments/course1Id');
    expect(auth).canWrite('/assignments/course1Id');
  });

  it('authenticated user can only read but not write', function() {
    const auth = { uid: 'randomUserId' };
    expect(auth).canRead('/assignments/course1Id');
    expect(auth).cannotWrite('/assignments/course1Id');
  });

  it('unauthenticated user cannot read  & write', function() {
    const auth = null;
    expect(auth).cannotRead('/assignments/course1Id');
    expect(auth).cannotWrite('/assignments/course1Id');
  });
});
