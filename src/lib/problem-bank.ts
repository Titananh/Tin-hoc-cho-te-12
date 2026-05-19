export interface Problem {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  acceptanceRate: number;
  xp: number;
  starterCode: string;
  testCases: Array<{ input: string; expectedOutput: string; isHidden: boolean }>;
  hints: string[];
  editorial: { approach: string; code: string; complexity: string };
}

export const PROBLEM_BANK: Problem[] = [
  // ==================== EASY (151-170) ====================
  {
    id: 151,
    slug: 'two-sum',
    title: 'Tìm Cặp Tổng Bằng K',
    description: 'Cho một mảng số nguyên `nums` và một số nguyên `target`. Tìm hai chỉ số sao cho tổng hai phần tử tại các chỉ số đó bằng `target`. Trả về mảng gồm hai chỉ số đó. Giả sử luôn có đúng một đáp án.',
    difficulty: 'easy',
    tags: ['mảng', 'hash-map'],
    acceptanceRate: 72,
    xp: 10,
    starterCode: `def two_sum(nums, target):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', isHidden: false },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]', isHidden: false },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]', isHidden: true },
    ],
    hints: [
      'Thử dùng một từ điển (dict) để lưu các giá trị đã duyệt qua.',
      'Với mỗi phần tử, kiểm tra xem target - phần_tử_hiện_tại có trong dict không.',
    ],
    editorial: {
      approach: 'Dùng hash map: duyệt qua mảng, với mỗi phần tử kiểm tra xem phần bù (target - num) đã xuất hiện chưa.',
      code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 152,
    slug: 'reverse-array',
    title: 'Đảo Ngược Mảng',
    description: 'Cho một mảng số nguyên `nums`. Hãy đảo ngược mảng tại chỗ (in-place) và trả về mảng đã đảo.',
    difficulty: 'easy',
    tags: ['mảng', 'hai-con-trỏ'],
    acceptanceRate: 85,
    xp: 10,
    starterCode: `def reverse_array(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3, 4, 5]', expectedOutput: '[5, 4, 3, 2, 1]', isHidden: false },
      { input: 'nums = [1, 2]', expectedOutput: '[2, 1]', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '[1]', isHidden: true },
    ],
    hints: [
      'Dùng hai con trỏ: một ở đầu, một ở cuối mảng.',
      'Hoán đổi hai phần tử rồi di chuyển con trỏ vào giữa.',
    ],
    editorial: {
      approach: 'Dùng hai con trỏ đầu-cuối, hoán đổi và tiến vào giữa cho đến khi gặp nhau.',
      code: `def reverse_array(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    return nums`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 153,
    slug: 'count-digits',
    title: 'Đếm Chữ Số',
    description: 'Cho một số nguyên dương `n`. Hãy đếm số lượng chữ số của `n` mà không dùng chuyển đổi sang chuỗi.',
    difficulty: 'easy',
    tags: ['toán', 'vòng-lặp'],
    acceptanceRate: 88,
    xp: 10,
    starterCode: `def count_digits(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 12345', expectedOutput: '5', isHidden: false },
      { input: 'n = 7', expectedOutput: '1', isHidden: false },
      { input: 'n = 1000000', expectedOutput: '7', isHidden: true },
    ],
    hints: [
      'Chia liên tục cho 10 cho đến khi n bằng 0.',
      'Mỗi lần chia, tăng biến đếm lên 1.',
    ],
    editorial: {
      approach: 'Chia n cho 10 liên tục, đếm số lần chia cho đến khi n = 0.',
      code: `def count_digits(n):
    count = 0
    while n > 0:
        n //= 10
        count += 1
    return count`,
      complexity: 'Thời gian: O(log n), Không gian: O(1)',
    },
  },
  {
    id: 154,
    slug: 'sum-of-digits',
    title: 'Tổng Các Chữ Số',
    description: 'Cho một số nguyên dương `n`. Hãy tính tổng các chữ số của `n`.',
    difficulty: 'easy',
    tags: ['toán', 'vòng-lặp'],
    acceptanceRate: 90,
    xp: 10,
    starterCode: `def sum_of_digits(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 123', expectedOutput: '6', isHidden: false },
      { input: 'n = 9999', expectedOutput: '36', isHidden: false },
      { input: 'n = 10', expectedOutput: '1', isHidden: true },
    ],
    hints: [
      'Lấy chữ số cuối bằng phép chia dư cho 10.',
      'Cộng dồn chữ số cuối rồi chia n cho 10.',
    ],
    editorial: {
      approach: 'Lặp: lấy chữ số cuối bằng n % 10, cộng vào tổng, rồi n //= 10.',
      code: `def sum_of_digits(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total`,
      complexity: 'Thời gian: O(log n), Không gian: O(1)',
    },
  },
  {
    id: 155,
    slug: 'palindrome-number',
    title: 'Kiểm Tra Số Palindrome',
    description: 'Cho một số nguyên `n`. Kiểm tra xem `n` có phải là số palindrome hay không (đọc xuôi ngược giống nhau). Số âm không phải palindrome.',
    difficulty: 'easy',
    tags: ['toán', 'logic'],
    acceptanceRate: 78,
    xp: 10,
    starterCode: `def is_palindrome(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 121', expectedOutput: 'True', isHidden: false },
      { input: 'n = -121', expectedOutput: 'False', isHidden: false },
      { input: 'n = 12321', expectedOutput: 'True', isHidden: true },
      { input: 'n = 10', expectedOutput: 'False', isHidden: true },
    ],
    hints: [
      'Số âm luôn không phải palindrome.',
      'Đảo ngược số rồi so sánh với số ban đầu.',
    ],
    editorial: {
      approach: 'Đảo ngược số bằng cách lấy từng chữ số cuối, so sánh kết quả với số gốc.',
      code: `def is_palindrome(n):
    if n < 0:
        return False
    original = n
    reversed_num = 0
    while n > 0:
        reversed_num = reversed_num * 10 + n % 10
        n //= 10
    return original == reversed_num`,
      complexity: 'Thời gian: O(log n), Không gian: O(1)',
    },
  },
  {
    id: 156,
    slug: 'find-missing-number',
    title: 'Tìm Số Bị Thiếu',
    description: 'Cho một mảng chứa `n` số phân biệt trong khoảng `[0, n]`. Tìm số duy nhất bị thiếu trong mảng.',
    difficulty: 'easy',
    tags: ['mảng', 'toán'],
    acceptanceRate: 75,
    xp: 10,
    starterCode: `def find_missing(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [3, 0, 1]', expectedOutput: '2', isHidden: false },
      { input: 'nums = [0, 1]', expectedOutput: '2', isHidden: false },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', expectedOutput: '8', isHidden: true },
    ],
    hints: [
      'Tổng từ 0 đến n là n*(n+1)/2.',
      'Trừ tổng thực tế của mảng khỏi tổng lý thuyết.',
    ],
    editorial: {
      approach: 'Dùng công thức tổng: tổng kỳ vọng - tổng thực tế = số bị thiếu.',
      code: `def find_missing(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 157,
    slug: 'remove-duplicates-sorted',
    title: 'Xóa Phần Tử Trùng Trong Mảng Đã Sắp Xếp',
    description: 'Cho một mảng số nguyên `nums` đã sắp xếp tăng dần. Xóa các phần tử trùng lặp tại chỗ sao cho mỗi phần tử chỉ xuất hiện một lần. Trả về số lượng phần tử không trùng.',
    difficulty: 'easy',
    tags: ['mảng', 'hai-con-trỏ'],
    acceptanceRate: 68,
    xp: 10,
    starterCode: `def remove_duplicates(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 1, 2]', expectedOutput: '2', isHidden: false },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '1', isHidden: true },
    ],
    hints: [
      'Dùng con trỏ chậm để đánh dấu vị trí phần tử không trùng tiếp theo.',
      'Con trỏ nhanh duyệt qua mảng, khi gặp phần tử mới thì ghi vào vị trí con trỏ chậm.',
    ],
    editorial: {
      approach: 'Hai con trỏ: con trỏ chậm giữ vị trí ghi, con trỏ nhanh duyệt tìm phần tử khác.',
      code: `def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 158,
    slug: 'merge-sorted-arrays',
    title: 'Gộp Hai Mảng Đã Sắp Xếp',
    description: 'Cho hai mảng số nguyên `nums1` và `nums2` đã sắp xếp tăng dần. Gộp chúng thành một mảng mới đã sắp xếp.',
    difficulty: 'easy',
    tags: ['mảng', 'hai-con-trỏ', 'sắp-xếp'],
    acceptanceRate: 70,
    xp: 10,
    starterCode: `def merge_sorted(nums1, nums2):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums1 = [1, 3, 5], nums2 = [2, 4, 6]', expectedOutput: '[1, 2, 3, 4, 5, 6]', isHidden: false },
      { input: 'nums1 = [1], nums2 = []', expectedOutput: '[1]', isHidden: false },
      { input: 'nums1 = [2, 5, 8], nums2 = [1, 3, 7, 9]', expectedOutput: '[1, 2, 3, 5, 7, 8, 9]', isHidden: true },
    ],
    hints: [
      'Dùng hai con trỏ, mỗi con trỏ cho một mảng.',
      'So sánh phần tử tại hai con trỏ, chọn phần tử nhỏ hơn đưa vào kết quả.',
    ],
    editorial: {
      approach: 'Hai con trỏ: so sánh phần tử đầu của hai mảng, lấy phần tử nhỏ hơn.',
      code: `def merge_sorted(nums1, nums2):
    result = []
    i, j = 0, 0
    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            result.append(nums1[i])
            i += 1
        else:
            result.append(nums2[j])
            j += 1
    result.extend(nums1[i:])
    result.extend(nums2[j:])
    return result`,
      complexity: 'Thời gian: O(n + m), Không gian: O(n + m)',
    },
  },
  {
    id: 159,
    slug: 'maximum-subarray',
    title: 'Mảng Con Có Tổng Lớn Nhất',
    description: 'Cho một mảng số nguyên `nums`. Tìm mảng con liên tiếp có tổng lớn nhất và trả về tổng đó.',
    difficulty: 'easy',
    tags: ['mảng', 'quy-hoạch-động', 'kadane'],
    acceptanceRate: 62,
    xp: 15,
    starterCode: `def max_subarray(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '1', isHidden: false },
      { input: 'nums = [5,4,-1,7,8]', expectedOutput: '23', isHidden: true },
    ],
    hints: [
      'Thuật toán Kadane: duy trì tổng hiện tại và tổng lớn nhất.',
      'Nếu tổng hiện tại < 0, bắt đầu lại từ phần tử tiếp theo.',
    ],
    editorial: {
      approach: 'Kadane: duyệt mảng, cập nhật tổng hiện tại = max(num, tổng_hiện_tại + num).',
      code: `def max_subarray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    return max_sum`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 160,
    slug: 'move-zeros',
    title: 'Di Chuyển Số 0 Về Cuối',
    description: 'Cho một mảng số nguyên `nums`. Di chuyển tất cả số 0 về cuối mảng, giữ nguyên thứ tự các phần tử khác 0. Thực hiện tại chỗ.',
    difficulty: 'easy',
    tags: ['mảng', 'hai-con-trỏ'],
    acceptanceRate: 76,
    xp: 10,
    starterCode: `def move_zeros(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [0, 1, 0, 3, 12]', expectedOutput: '[1, 3, 12, 0, 0]', isHidden: false },
      { input: 'nums = [0]', expectedOutput: '[0]', isHidden: false },
      { input: 'nums = [1, 0, 0, 0, 2, 3]', expectedOutput: '[1, 2, 3, 0, 0, 0]', isHidden: true },
    ],
    hints: [
      'Dùng con trỏ chậm để đánh dấu vị trí ghi phần tử khác 0.',
      'Duyệt mảng, ghi phần tử khác 0 vào vị trí con trỏ chậm, sau đó điền 0 phía sau.',
    ],
    editorial: {
      approach: 'Hai con trỏ: ghi tất cả phần tử khác 0 lên đầu, điền 0 phần còn lại.',
      code: `def move_zeros(nums):
    pos = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[pos] = nums[i]
            pos += 1
    while pos < len(nums):
        nums[pos] = 0
        pos += 1
    return nums`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 161,
    slug: 'rotate-array',
    title: 'Xoay Mảng K Bước',
    description: 'Cho một mảng số nguyên `nums` và số nguyên `k`. Xoay mảng sang phải `k` bước.',
    difficulty: 'easy',
    tags: ['mảng', 'toán'],
    acceptanceRate: 60,
    xp: 15,
    starterCode: `def rotate_array(nums, k):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', expectedOutput: '[5, 6, 7, 1, 2, 3, 4]', isHidden: false },
      { input: 'nums = [-1,-100,3,99], k = 2', expectedOutput: '[3, 99, -1, -100]', isHidden: false },
      { input: 'nums = [1, 2], k = 3', expectedOutput: '[2, 1]', isHidden: true },
    ],
    hints: [
      'k có thể lớn hơn độ dài mảng, hãy lấy k % n.',
      'Thử đảo ngược toàn bộ mảng, rồi đảo k phần tử đầu, rồi đảo phần còn lại.',
    ],
    editorial: {
      approach: 'Đảo ngược 3 lần: đảo toàn bộ, đảo [0:k], đảo [k:n].',
      code: `def rotate_array(nums, k):
    n = len(nums)
    k = k % n
    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])
    return nums`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 162,
    slug: 'contains-duplicate',
    title: 'Kiểm Tra Phần Tử Trùng',
    description: 'Cho một mảng số nguyên `nums`. Trả về `True` nếu có bất kỳ phần tử nào xuất hiện ít nhất hai lần, ngược lại trả về `False`.',
    difficulty: 'easy',
    tags: ['mảng', 'hash-set'],
    acceptanceRate: 80,
    xp: 10,
    starterCode: `def contains_duplicate(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3, 1]', expectedOutput: 'True', isHidden: false },
      { input: 'nums = [1, 2, 3, 4]', expectedOutput: 'False', isHidden: false },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'True', isHidden: true },
    ],
    hints: [
      'Dùng set để lưu các phần tử đã gặp.',
      'Nếu phần tử hiện tại đã có trong set, trả về True.',
    ],
    editorial: {
      approach: 'Dùng set: duyệt mảng, kiểm tra phần tử đã tồn tại trong set chưa.',
      code: `def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 163,
    slug: 'single-number',
    title: 'Số Xuất Hiện Một Lần',
    description: 'Cho một mảng số nguyên `nums` trong đó mỗi phần tử xuất hiện đúng hai lần, trừ một phần tử xuất hiện đúng một lần. Tìm phần tử đó.',
    difficulty: 'easy',
    tags: ['mảng', 'bit-manipulation'],
    acceptanceRate: 74,
    xp: 10,
    starterCode: `def single_number(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [2, 2, 1]', expectedOutput: '1', isHidden: false },
      { input: 'nums = [4, 1, 2, 1, 2]', expectedOutput: '4', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '1', isHidden: true },
    ],
    hints: [
      'XOR của hai số giống nhau bằng 0.',
      'XOR tất cả phần tử, kết quả là số xuất hiện một lần.',
    ],
    editorial: {
      approach: 'Dùng XOR: a ^ a = 0, a ^ 0 = a. XOR toàn bộ mảng cho ra số duy nhất.',
      code: `def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 164,
    slug: 'intersection-of-arrays',
    title: 'Giao Của Hai Mảng',
    description: 'Cho hai mảng số nguyên `nums1` và `nums2`. Trả về mảng chứa các phần tử chung (mỗi phần tử chỉ xuất hiện một lần trong kết quả).',
    difficulty: 'easy',
    tags: ['mảng', 'hash-set'],
    acceptanceRate: 72,
    xp: 10,
    starterCode: `def intersection(nums1, nums2):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums1 = [1,2,2,1], nums2 = [2,2]', expectedOutput: '[2]', isHidden: false },
      { input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', expectedOutput: '[4, 9]', isHidden: false },
      { input: 'nums1 = [1,2,3], nums2 = [4,5,6]', expectedOutput: '[]', isHidden: true },
    ],
    hints: [
      'Chuyển một mảng thành set.',
      'Duyệt mảng còn lại, kiểm tra phần tử có trong set không.',
    ],
    editorial: {
      approach: 'Dùng set intersection: chuyển cả hai mảng thành set rồi lấy giao.',
      code: `def intersection(nums1, nums2):
    return sorted(list(set(nums1) & set(nums2)))`,
      complexity: 'Thời gian: O(n + m), Không gian: O(n + m)',
    },
  },
  {
    id: 165,
    slug: 'plus-one',
    title: 'Cộng Một',
    description: 'Cho một mảng `digits` biểu diễn một số nguyên lớn (mỗi phần tử là một chữ số). Cộng thêm 1 vào số đó và trả về mảng kết quả.',
    difficulty: 'easy',
    tags: ['mảng', 'toán'],
    acceptanceRate: 65,
    xp: 10,
    starterCode: `def plus_one(digits):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'digits = [1, 2, 3]', expectedOutput: '[1, 2, 4]', isHidden: false },
      { input: 'digits = [9, 9, 9]', expectedOutput: '[1, 0, 0, 0]', isHidden: false },
      { input: 'digits = [0]', expectedOutput: '[1]', isHidden: true },
    ],
    hints: [
      'Bắt đầu từ chữ số cuối cùng, cộng 1.',
      'Nếu có nhớ (carry), tiếp tục cộng vào chữ số trước đó.',
    ],
    editorial: {
      approach: 'Duyệt từ cuối, xử lý nhớ (carry). Nếu sau cùng vẫn còn nhớ, thêm 1 vào đầu.',
      code: `def plus_one(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 166,
    slug: 'valid-anagram',
    title: 'Kiểm Tra Anagram',
    description: 'Cho hai chuỗi `s` và `t`. Kiểm tra xem `t` có phải là anagram (hoán vị chữ cái) của `s` hay không.',
    difficulty: 'easy',
    tags: ['chuỗi', 'hash-map', 'sắp-xếp'],
    acceptanceRate: 77,
    xp: 10,
    starterCode: `def is_anagram(s, t):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'True', isHidden: false },
      { input: 's = "rat", t = "car"', expectedOutput: 'False', isHidden: false },
      { input: 's = "a", t = "a"', expectedOutput: 'True', isHidden: true },
      { input: 's = "ab", t = "a"', expectedOutput: 'False', isHidden: true },
    ],
    hints: [
      'Hai chuỗi là anagram nếu chúng có cùng tần suất mỗi ký tự.',
      'Dùng dict đếm tần suất hoặc sắp xếp cả hai chuỗi rồi so sánh.',
    ],
    editorial: {
      approach: 'Đếm tần suất ký tự bằng dict, so sánh hai dict.',
      code: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for c in t:
        count[c] = count.get(c, 0) - 1
        if count[c] < 0:
            return False
    return True`,
      complexity: 'Thời gian: O(n), Không gian: O(1) (26 ký tự)',
    },
  },
  {
    id: 167,
    slug: 'first-unique-char',
    title: 'Ký Tự Duy Nhất Đầu Tiên',
    description: 'Cho một chuỗi `s`. Tìm chỉ số của ký tự đầu tiên không lặp lại. Nếu không có, trả về -1.',
    difficulty: 'easy',
    tags: ['chuỗi', 'hash-map'],
    acceptanceRate: 70,
    xp: 10,
    starterCode: `def first_unique_char(s):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 's = "leetcode"', expectedOutput: '0', isHidden: false },
      { input: 's = "loveleetcode"', expectedOutput: '2', isHidden: false },
      { input: 's = "aabb"', expectedOutput: '-1', isHidden: true },
    ],
    hints: [
      'Đếm tần suất mỗi ký tự trước.',
      'Duyệt lại chuỗi, tìm ký tự đầu tiên có tần suất = 1.',
    ],
    editorial: {
      approach: 'Hai lần duyệt: lần 1 đếm tần suất, lần 2 tìm ký tự có count = 1.',
      code: `def first_unique_char(s):
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for i, c in enumerate(s):
        if count[c] == 1:
            return i
    return -1`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 168,
    slug: 'majority-element',
    title: 'Phần Tử Đa Số',
    description: 'Cho một mảng `nums` có kích thước `n`. Tìm phần tử xuất hiện nhiều hơn `n/2` lần. Giả sử phần tử đa số luôn tồn tại.',
    difficulty: 'easy',
    tags: ['mảng', 'bỏ-phiếu-boyer-moore'],
    acceptanceRate: 73,
    xp: 10,
    starterCode: `def majority_element(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [3, 2, 3]', expectedOutput: '3', isHidden: false },
      { input: 'nums = [2,2,1,1,1,2,2]', expectedOutput: '2', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '1', isHidden: true },
    ],
    hints: [
      'Thuật toán Boyer-Moore Voting: giữ một ứng viên và bộ đếm.',
      'Khi đếm = 0, chọn ứng viên mới. Tăng đếm nếu gặp ứng viên, giảm nếu khác.',
    ],
    editorial: {
      approach: 'Boyer-Moore Voting: duy trì ứng viên và đếm, phần tử đa số sẽ thắng.',
      code: `def majority_element(nums):
    candidate = nums[0]
    count = 1
    for i in range(1, len(nums)):
        if count == 0:
            candidate = nums[i]
            count = 1
        elif nums[i] == candidate:
            count += 1
        else:
            count -= 1
    return candidate`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 169,
    slug: 'power-of-two',
    title: 'Lũy Thừa Của 2',
    description: 'Cho một số nguyên `n`. Kiểm tra xem `n` có phải là lũy thừa của 2 hay không (1, 2, 4, 8, 16, ...).',
    difficulty: 'easy',
    tags: ['toán', 'bit-manipulation'],
    acceptanceRate: 78,
    xp: 10,
    starterCode: `def is_power_of_two(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 1', expectedOutput: 'True', isHidden: false },
      { input: 'n = 16', expectedOutput: 'True', isHidden: false },
      { input: 'n = 3', expectedOutput: 'False', isHidden: true },
      { input: 'n = 0', expectedOutput: 'False', isHidden: true },
    ],
    hints: [
      'Lũy thừa của 2 trong nhị phân chỉ có đúng 1 bit 1.',
      'n & (n - 1) == 0 khi n là lũy thừa của 2 (và n > 0).',
    ],
    editorial: {
      approach: 'Dùng bit trick: n > 0 và n & (n-1) == 0.',
      code: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,
      complexity: 'Thời gian: O(1), Không gian: O(1)',
    },
  },
  {
    id: 170,
    slug: 'fizz-buzz',
    title: 'Fizz Buzz',
    description: 'Cho số nguyên dương `n`. Trả về mảng chuỗi từ 1 đến n: nếu chia hết cho 3 ghi "Fizz", chia hết cho 5 ghi "Buzz", chia hết cho cả 3 và 5 ghi "FizzBuzz", còn lại ghi số đó.',
    difficulty: 'easy',
    tags: ['logic', 'chuỗi'],
    acceptanceRate: 88,
    xp: 10,
    starterCode: `def fizz_buzz(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 5', expectedOutput: '["1", "2", "Fizz", "4", "Buzz"]', isHidden: false },
      { input: 'n = 15', expectedOutput: '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]', isHidden: false },
      { input: 'n = 3', expectedOutput: '["1", "2", "Fizz"]', isHidden: true },
    ],
    hints: [
      'Kiểm tra chia hết cho 15 trước (cả 3 và 5).',
      'Sau đó kiểm tra chia hết cho 3, rồi 5, cuối cùng là số thường.',
    ],
    editorial: {
      approach: 'Duyệt từ 1 đến n, kiểm tra điều kiện chia hết theo thứ tự ưu tiên.',
      code: `def fizz_buzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  // ==================== MEDIUM (171-190) ====================
  {
    id: 171,
    slug: 'container-with-most-water',
    title: 'Chứa Nhiều Nước Nhất',
    description: 'Cho mảng `height` gồm n số nguyên dương, mỗi phần tử biểu diễn chiều cao của một thanh đứng. Tìm hai thanh tạo thành bình chứa nhiều nước nhất (diện tích = min(height[i], height[j]) * (j - i)).',
    difficulty: 'medium',
    tags: ['mảng', 'hai-con-trỏ', 'tham-lam'],
    acceptanceRate: 55,
    xp: 25,
    starterCode: `def max_area(height):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expectedOutput: '49', isHidden: false },
      { input: 'height = [1,1]', expectedOutput: '1', isHidden: false },
      { input: 'height = [4,3,2,1,4]', expectedOutput: '16', isHidden: true },
    ],
    hints: [
      'Dùng hai con trỏ ở hai đầu mảng.',
      'Di chuyển con trỏ có chiều cao nhỏ hơn vào trong.',
    ],
    editorial: {
      approach: 'Hai con trỏ: bắt đầu từ hai đầu, tính diện tích, di chuyển con trỏ thấp hơn.',
      code: `def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        w = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, w * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 172,
    slug: 'three-sum',
    title: 'Tìm Bộ Ba Tổng Bằng 0',
    description: 'Cho mảng số nguyên `nums`. Tìm tất cả bộ ba (a, b, c) sao cho a + b + c = 0. Kết quả không chứa bộ ba trùng lặp.',
    difficulty: 'medium',
    tags: ['mảng', 'hai-con-trỏ', 'sắp-xếp'],
    acceptanceRate: 42,
    xp: 30,
    starterCode: `def three_sum(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', expectedOutput: '[[-1, -1, 2], [-1, 0, 1]]', isHidden: false },
      { input: 'nums = [0, 0, 0]', expectedOutput: '[[0, 0, 0]]', isHidden: false },
      { input: 'nums = [0, 1, 1]', expectedOutput: '[]', isHidden: true },
    ],
    hints: [
      'Sắp xếp mảng trước.',
      'Cố định một phần tử, dùng hai con trỏ tìm hai phần tử còn lại.',
      'Bỏ qua phần tử trùng để tránh kết quả lặp.',
    ],
    editorial: {
      approach: 'Sắp xếp + hai con trỏ: cố định i, dùng left/right tìm cặp có tổng = -nums[i].',
      code: `def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return result`,
      complexity: 'Thời gian: O(n²), Không gian: O(1)',
    },
  },
  {
    id: 173,
    slug: 'longest-substring-no-repeat',
    title: 'Chuỗi Con Dài Nhất Không Lặp Ký Tự',
    description: 'Cho một chuỗi `s`. Tìm độ dài chuỗi con liên tiếp dài nhất mà không có ký tự nào lặp lại.',
    difficulty: 'medium',
    tags: ['chuỗi', 'cửa-sổ-trượt', 'hash-set'],
    acceptanceRate: 48,
    xp: 25,
    starterCode: `def length_of_longest_substring(s):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 's = "abcabcbb"', expectedOutput: '3', isHidden: false },
      { input: 's = "bbbbb"', expectedOutput: '1', isHidden: false },
      { input: 's = "pwwkew"', expectedOutput: '3', isHidden: true },
      { input: 's = ""', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Dùng cửa sổ trượt (sliding window) với hai con trỏ.',
      'Dùng set để theo dõi ký tự trong cửa sổ hiện tại.',
    ],
    editorial: {
      approach: 'Cửa sổ trượt: mở rộng bên phải, thu hẹp bên trái khi gặp ký tự trùng.',
      code: `def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
      complexity: 'Thời gian: O(n), Không gian: O(min(n, m)) với m là bộ ký tự',
    },
  },
  {
    id: 174,
    slug: 'valid-parentheses',
    title: 'Ngoặc Hợp Lệ',
    description: 'Cho chuỗi `s` chỉ chứa các ký tự \'(\', \')\', \'{\', \'}\', \'[\', \']\'. Kiểm tra xem chuỗi có hợp lệ không (mỗi ngoặc mở có ngoặc đóng tương ứng đúng thứ tự).',
    difficulty: 'medium',
    tags: ['chuỗi', 'stack'],
    acceptanceRate: 55,
    xp: 25,
    starterCode: `def is_valid(s):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 's = "()"', expectedOutput: 'True', isHidden: false },
      { input: 's = "()[]{}"', expectedOutput: 'True', isHidden: false },
      { input: 's = "(]"', expectedOutput: 'False', isHidden: false },
      { input: 's = "([)]"', expectedOutput: 'False', isHidden: true },
    ],
    hints: [
      'Dùng stack: đẩy ngoặc mở vào, khi gặp ngoặc đóng thì kiểm tra đỉnh stack.',
      'Nếu stack rỗng khi gặp ngoặc đóng hoặc không khớp, trả về False.',
    ],
    editorial: {
      approach: 'Stack: đẩy ngoặc mở, pop khi gặp ngoặc đóng và kiểm tra khớp.',
      code: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return len(stack) == 0`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 175,
    slug: 'next-greater-element',
    title: 'Phần Tử Lớn Hơn Tiếp Theo',
    description: 'Cho mảng số nguyên `nums`. Với mỗi phần tử, tìm phần tử lớn hơn đầu tiên bên phải nó. Nếu không có, ghi -1.',
    difficulty: 'medium',
    tags: ['mảng', 'stack'],
    acceptanceRate: 50,
    xp: 25,
    starterCode: `def next_greater(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [4, 5, 2, 25]', expectedOutput: '[5, 25, 25, -1]', isHidden: false },
      { input: 'nums = [13, 7, 6, 12]', expectedOutput: '[-1, 12, 12, -1]', isHidden: false },
      { input: 'nums = [1, 2, 3, 4]', expectedOutput: '[2, 3, 4, -1]', isHidden: true },
    ],
    hints: [
      'Dùng stack lưu chỉ số các phần tử chưa tìm được next greater.',
      'Duyệt từ trái sang phải, khi phần tử hiện tại > đỉnh stack thì pop và ghi kết quả.',
    ],
    editorial: {
      approach: 'Monotonic stack: duy trì stack giảm dần, pop khi gặp phần tử lớn hơn.',
      code: `def next_greater(nums):
    n = len(nums)
    result = [-1] * n
    stack = []
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)
    return result`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 176,
    slug: 'min-stack',
    title: 'Stack Có Hàm Min',
    description: 'Thiết kế một stack hỗ trợ push, pop, top và lấy giá trị nhỏ nhất trong O(1). Cài đặt hàm `min_stack_operations(ops, vals)` nhận danh sách thao tác và giá trị, trả về kết quả các lệnh getMin.',
    difficulty: 'medium',
    tags: ['stack', 'thiết-kế'],
    acceptanceRate: 52,
    xp: 25,
    starterCode: `def min_stack_operations(ops, vals):
    # ops: danh sách thao tác ["push","push","getMin","pop","getMin"]
    # vals: giá trị tương ứng [5, 3, None, None, None]
    # Trả về danh sách kết quả getMin
    pass`,
    testCases: [
      { input: 'ops = ["push","push","getMin","pop","getMin"], vals = [5, 3, None, None, None]', expectedOutput: '[3, 5]', isHidden: false },
      { input: 'ops = ["push","push","push","getMin"], vals = [2, 0, 3, None]', expectedOutput: '[0]', isHidden: false },
      { input: 'ops = ["push","push","pop","getMin"], vals = [1, 1, None, None]', expectedOutput: '[1]', isHidden: true },
    ],
    hints: [
      'Dùng stack phụ để lưu giá trị min tại mỗi thời điểm.',
      'Khi push, đẩy min(val, min_hiện_tại) vào stack phụ.',
    ],
    editorial: {
      approach: 'Dùng hai stack: stack chính và stack min. Stack min luôn giữ min tương ứng.',
      code: `def min_stack_operations(ops, vals):
    stack = []
    min_stack = []
    results = []
    for op, val in zip(ops, vals):
        if op == "push":
            stack.append(val)
            if not min_stack or val <= min_stack[-1]:
                min_stack.append(val)
            else:
                min_stack.append(min_stack[-1])
        elif op == "pop":
            stack.pop()
            min_stack.pop()
        elif op == "getMin":
            results.append(min_stack[-1])
    return results`,
      complexity: 'Thời gian: O(1) mỗi thao tác, Không gian: O(n)',
    },
  },
  {
    id: 177,
    slug: 'binary-search',
    title: 'Tìm Kiếm Nhị Phân',
    description: 'Cho mảng số nguyên `nums` đã sắp xếp tăng dần và số `target`. Tìm chỉ số của `target` trong mảng. Nếu không có, trả về -1.',
    difficulty: 'medium',
    tags: ['mảng', 'tìm-kiếm-nhị-phân'],
    acceptanceRate: 65,
    xp: 20,
    starterCode: `def binary_search(nums, target):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4', isHidden: false },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1', isHidden: false },
      { input: 'nums = [5], target = 5', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Dùng hai con trỏ left và right.',
      'So sánh phần tử giữa với target để thu hẹp phạm vi tìm kiếm.',
    ],
    editorial: {
      approach: 'Tìm kiếm nhị phân cổ điển: chia đôi mảng mỗi bước.',
      code: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      complexity: 'Thời gian: O(log n), Không gian: O(1)',
    },
  },
  {
    id: 178,
    slug: 'search-insert-position',
    title: 'Tìm Vị Trí Chèn',
    description: 'Cho mảng đã sắp xếp `nums` và `target`. Tìm chỉ số của target hoặc vị trí mà target sẽ được chèn vào để mảng vẫn sắp xếp.',
    difficulty: 'medium',
    tags: ['mảng', 'tìm-kiếm-nhị-phân'],
    acceptanceRate: 62,
    xp: 20,
    starterCode: `def search_insert(nums, target):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1,3,5,6], target = 5', expectedOutput: '2', isHidden: false },
      { input: 'nums = [1,3,5,6], target = 2', expectedOutput: '1', isHidden: false },
      { input: 'nums = [1,3,5,6], target = 7', expectedOutput: '4', isHidden: true },
      { input: 'nums = [1,3,5,6], target = 0', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Đây là biến thể của tìm kiếm nhị phân.',
      'Khi kết thúc, left chính là vị trí chèn.',
    ],
    editorial: {
      approach: 'Binary search: khi kết thúc vòng lặp, left là vị trí chèn phù hợp.',
      code: `def search_insert(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left`,
      complexity: 'Thời gian: O(log n), Không gian: O(1)',
    },
  },
  {
    id: 179,
    slug: 'find-peak-element',
    title: 'Tìm Phần Tử Đỉnh',
    description: 'Cho mảng `nums` trong đó nums[i] != nums[i+1]. Tìm chỉ số của một phần tử đỉnh (lớn hơn cả hai phần tử lân cận). Mảng có thể có nhiều đỉnh, trả về bất kỳ.',
    difficulty: 'medium',
    tags: ['mảng', 'tìm-kiếm-nhị-phân'],
    acceptanceRate: 50,
    xp: 25,
    starterCode: `def find_peak(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3, 1]', expectedOutput: '2', isHidden: false },
      { input: 'nums = [1, 2, 1, 3, 5, 6, 4]', expectedOutput: '5', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Có thể dùng binary search vì nếu nums[mid] < nums[mid+1] thì đỉnh ở bên phải.',
      'Ngược lại đỉnh ở bên trái (hoặc chính mid).',
    ],
    editorial: {
      approach: 'Binary search: so sánh mid với mid+1 để quyết định hướng tìm.',
      code: `def find_peak(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < nums[mid + 1]:
            left = mid + 1
        else:
            right = mid
    return left`,
      complexity: 'Thời gian: O(log n), Không gian: O(1)',
    },
  },
  {
    id: 180,
    slug: 'sort-colors',
    title: 'Sắp Xếp Màu (Dutch National Flag)',
    description: 'Cho mảng `nums` chỉ chứa 0, 1, 2. Sắp xếp mảng tại chỗ sao cho các phần tử cùng giá trị nằm cạnh nhau theo thứ tự 0, 1, 2.',
    difficulty: 'medium',
    tags: ['mảng', 'hai-con-trỏ', 'sắp-xếp'],
    acceptanceRate: 55,
    xp: 25,
    starterCode: `def sort_colors(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [2, 0, 2, 1, 1, 0]', expectedOutput: '[0, 0, 1, 1, 2, 2]', isHidden: false },
      { input: 'nums = [2, 0, 1]', expectedOutput: '[0, 1, 2]', isHidden: false },
      { input: 'nums = [0]', expectedOutput: '[0]', isHidden: true },
    ],
    hints: [
      'Dùng 3 con trỏ: low, mid, high.',
      'Phần tử 0 đưa về đầu, phần tử 2 đưa về cuối, phần tử 1 giữ nguyên.',
    ],
    editorial: {
      approach: 'Dutch National Flag: 3 con trỏ phân vùng mảng thành 3 phần.',
      code: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 181,
    slug: 'merge-intervals',
    title: 'Gộp Các Khoảng',
    description: 'Cho mảng các khoảng `intervals` với intervals[i] = [start_i, end_i]. Gộp tất cả các khoảng chồng lấn và trả về mảng các khoảng không chồng lấn.',
    difficulty: 'medium',
    tags: ['mảng', 'sắp-xếp'],
    acceptanceRate: 48,
    xp: 25,
    starterCode: `def merge_intervals(intervals):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1, 6], [8, 10], [15, 18]]', isHidden: false },
      { input: 'intervals = [[1,4],[4,5]]', expectedOutput: '[[1, 5]]', isHidden: false },
      { input: 'intervals = [[1,4],[0,4]]', expectedOutput: '[[0, 4]]', isHidden: true },
    ],
    hints: [
      'Sắp xếp các khoảng theo điểm bắt đầu.',
      'Duyệt qua, nếu khoảng hiện tại chồng lấn với khoảng trước thì gộp.',
    ],
    editorial: {
      approach: 'Sắp xếp theo start, duyệt và gộp khi end trước >= start sau.',
      code: `def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for i in range(1, len(intervals)):
        if intervals[i][0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], intervals[i][1])
        else:
            merged.append(intervals[i])
    return merged`,
      complexity: 'Thời gian: O(n log n), Không gian: O(n)',
    },
  },
  {
    id: 182,
    slug: 'group-anagrams',
    title: 'Nhóm Các Anagram',
    description: 'Cho mảng chuỗi `strs`. Nhóm các chuỗi là anagram của nhau lại với nhau. Trả về danh sách các nhóm.',
    difficulty: 'medium',
    tags: ['chuỗi', 'hash-map', 'sắp-xếp'],
    acceptanceRate: 52,
    xp: 25,
    starterCode: `def group_anagrams(strs):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]', isHidden: false },
      { input: 'strs = [""]', expectedOutput: '[[""]]', isHidden: false },
      { input: 'strs = ["a"]', expectedOutput: '[["a"]]', isHidden: true },
    ],
    hints: [
      'Hai chuỗi là anagram nếu khi sắp xếp chúng giống nhau.',
      'Dùng chuỗi đã sắp xếp làm key trong dict.',
    ],
    editorial: {
      approach: 'Hash map: key là chuỗi đã sort, value là danh sách các anagram.',
      code: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())`,
      complexity: 'Thời gian: O(n * k log k) với k là độ dài chuỗi dài nhất, Không gian: O(n * k)',
    },
  },
  {
    id: 183,
    slug: 'top-k-frequent',
    title: 'K Phần Tử Xuất Hiện Nhiều Nhất',
    description: 'Cho mảng số nguyên `nums` và số nguyên `k`. Trả về `k` phần tử xuất hiện nhiều nhất (thứ tự bất kỳ).',
    difficulty: 'medium',
    tags: ['mảng', 'hash-map', 'heap', 'sắp-xếp'],
    acceptanceRate: 50,
    xp: 25,
    starterCode: `def top_k_frequent(nums, k):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expectedOutput: '[1, 2]', isHidden: false },
      { input: 'nums = [1], k = 1', expectedOutput: '[1]', isHidden: false },
      { input: 'nums = [4,4,4,1,1,2,2,2,3], k = 2', expectedOutput: '[4, 2]', isHidden: true },
    ],
    hints: [
      'Đếm tần suất bằng dict.',
      'Sắp xếp theo tần suất hoặc dùng bucket sort.',
    ],
    editorial: {
      approach: 'Đếm tần suất + bucket sort: bucket[i] chứa các phần tử xuất hiện i lần.',
      code: `def top_k_frequent(nums, k):
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1
    bucket = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        bucket[freq].append(num)
    result = []
    for i in range(len(bucket) - 1, -1, -1):
        for num in bucket[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 184,
    slug: 'kth-largest',
    title: 'Phần Tử Lớn Thứ K',
    description: 'Cho mảng số nguyên `nums` và số nguyên `k`. Tìm phần tử lớn thứ `k` trong mảng (không phải phần tử lớn thứ k phân biệt).',
    difficulty: 'medium',
    tags: ['mảng', 'sắp-xếp', 'heap'],
    acceptanceRate: 55,
    xp: 25,
    starterCode: `def find_kth_largest(nums, k):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', expectedOutput: '5', isHidden: false },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', expectedOutput: '4', isHidden: false },
      { input: 'nums = [1], k = 1', expectedOutput: '1', isHidden: true },
    ],
    hints: [
      'Cách đơn giản: sắp xếp giảm dần rồi lấy phần tử thứ k-1.',
      'Cách tối ưu: dùng min-heap kích thước k.',
    ],
    editorial: {
      approach: 'Sắp xếp giảm dần và lấy phần tử tại vị trí k-1.',
      code: `def find_kth_largest(nums, k):
    nums.sort(reverse=True)
    return nums[k - 1]`,
      complexity: 'Thời gian: O(n log n), Không gian: O(1)',
    },
  },
  {
    id: 185,
    slug: 'product-except-self',
    title: 'Tích Mảng Trừ Chính Nó',
    description: 'Cho mảng số nguyên `nums`. Trả về mảng `result` sao cho result[i] bằng tích tất cả phần tử trong nums trừ nums[i]. Không được dùng phép chia.',
    difficulty: 'medium',
    tags: ['mảng', 'prefix'],
    acceptanceRate: 48,
    xp: 30,
    starterCode: `def product_except_self(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3, 4]', expectedOutput: '[24, 12, 8, 6]', isHidden: false },
      { input: 'nums = [-1, 1, 0, -3, 3]', expectedOutput: '[0, 0, 9, 0, 0]', isHidden: false },
      { input: 'nums = [2, 3]', expectedOutput: '[3, 2]', isHidden: true },
    ],
    hints: [
      'Tính mảng prefix product (tích từ trái) và suffix product (tích từ phải).',
      'result[i] = prefix[i] * suffix[i].',
    ],
    editorial: {
      approach: 'Hai lượt duyệt: lượt 1 tính tích bên trái, lượt 2 nhân tích bên phải.',
      code: `def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result`,
      complexity: 'Thời gian: O(n), Không gian: O(1) (không tính mảng kết quả)',
    },
  },
  {
    id: 186,
    slug: 'longest-consecutive',
    title: 'Dãy Liên Tiếp Dài Nhất',
    description: 'Cho mảng số nguyên `nums` (không sắp xếp). Tìm độ dài dãy số liên tiếp dài nhất (ví dụ: 1,2,3,4 có độ dài 4).',
    difficulty: 'medium',
    tags: ['mảng', 'hash-set'],
    acceptanceRate: 45,
    xp: 30,
    starterCode: `def longest_consecutive(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [100, 4, 200, 1, 3, 2]', expectedOutput: '4', isHidden: false },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', expectedOutput: '9', isHidden: false },
      { input: 'nums = []', expectedOutput: '0', isHidden: true },
    ],
    hints: [
      'Chuyển mảng thành set để tra cứu O(1).',
      'Chỉ bắt đầu đếm từ số mà num-1 không có trong set (đầu dãy).',
    ],
    editorial: {
      approach: 'Hash set: tìm đầu mỗi dãy (num-1 không tồn tại), đếm dài nhất.',
      code: `def longest_consecutive(nums):
    num_set = set(nums)
    max_len = 0
    for num in num_set:
        if num - 1 not in num_set:
            current = num
            length = 1
            while current + 1 in num_set:
                current += 1
                length += 1
            max_len = max(max_len, length)
    return max_len`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 187,
    slug: 'subarray-sum-k',
    title: 'Mảng Con Có Tổng Bằng K',
    description: 'Cho mảng số nguyên `nums` và số nguyên `k`. Đếm số lượng mảng con liên tiếp có tổng bằng `k`.',
    difficulty: 'medium',
    tags: ['mảng', 'hash-map', 'prefix-sum'],
    acceptanceRate: 42,
    xp: 30,
    starterCode: `def subarray_sum(nums, k):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 1, 1], k = 2', expectedOutput: '2', isHidden: false },
      { input: 'nums = [1, 2, 3], k = 3', expectedOutput: '2', isHidden: false },
      { input: 'nums = [1, -1, 0], k = 0', expectedOutput: '3', isHidden: true },
    ],
    hints: [
      'Dùng prefix sum: tổng mảng con [i..j] = prefix[j] - prefix[i-1].',
      'Dùng hash map đếm số lần mỗi prefix sum xuất hiện.',
    ],
    editorial: {
      approach: 'Prefix sum + hash map: đếm số prefix sum trước đó bằng current_sum - k.',
      code: `def subarray_sum(nums, k):
    count = 0
    current_sum = 0
    prefix_counts = {0: 1}
    for num in nums:
        current_sum += num
        if current_sum - k in prefix_counts:
            count += prefix_counts[current_sum - k]
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
    return count`,
      complexity: 'Thời gian: O(n), Không gian: O(n)',
    },
  },
  {
    id: 188,
    slug: 'coin-change',
    title: 'Đổi Tiền Xu (Số Xu Ít Nhất)',
    description: 'Cho mảng `coins` chứa mệnh giá các đồng xu và số `amount`. Tìm số đồng xu ít nhất để tạo thành `amount`. Nếu không thể, trả về -1.',
    difficulty: 'medium',
    tags: ['quy-hoạch-động', 'mảng'],
    acceptanceRate: 40,
    xp: 30,
    starterCode: `def coin_change(coins, amount):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'coins = [1, 5, 10], amount = 11', expectedOutput: '2', isHidden: false },
      { input: 'coins = [2], amount = 3', expectedOutput: '-1', isHidden: false },
      { input: 'coins = [1], amount = 0', expectedOutput: '0', isHidden: true },
      { input: 'coins = [1, 2, 5], amount = 100', expectedOutput: '20', isHidden: true },
    ],
    hints: [
      'Dùng quy hoạch động: dp[i] = số xu ít nhất để tạo số tiền i.',
      'dp[i] = min(dp[i - coin] + 1) với mọi coin <= i.',
    ],
    editorial: {
      approach: 'DP bottom-up: dp[i] = min số xu cho amount i, thử từng mệnh giá.',
      code: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
    return dp[amount] if dp[amount] != float('inf') else -1`,
      complexity: 'Thời gian: O(amount * len(coins)), Không gian: O(amount)',
    },
  },
  {
    id: 189,
    slug: 'generate-parentheses',
    title: 'Sinh Ngoặc Hợp Lệ',
    description: 'Cho số nguyên `n`. Sinh tất cả các tổ hợp ngoặc đơn hợp lệ gồm `n` cặp ngoặc.',
    difficulty: 'medium',
    tags: ['chuỗi', 'backtracking', 'đệ-quy'],
    acceptanceRate: 45,
    xp: 30,
    starterCode: `def generate_parenthesis(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 3', expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]', isHidden: false },
      { input: 'n = 1', expectedOutput: '["()"]', isHidden: false },
      { input: 'n = 2', expectedOutput: '["(())","()()"]', isHidden: true },
    ],
    hints: [
      'Dùng backtracking: thêm "(" nếu số ngoặc mở < n.',
      'Thêm ")" nếu số ngoặc đóng < số ngoặc mở.',
    ],
    editorial: {
      approach: 'Backtracking: theo dõi số ngoặc mở/đóng, chỉ thêm khi hợp lệ.',
      code: `def generate_parenthesis(n):
    result = []
    def backtrack(current, open_count, close_count):
        if len(current) == 2 * n:
            result.append(current)
            return
        if open_count < n:
            backtrack(current + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(current + ')', open_count, close_count + 1)
    backtrack('', 0, 0)
    return result`,
      complexity: 'Thời gian: O(4^n / sqrt(n)), Không gian: O(n)',
    },
  },
  {
    id: 190,
    slug: 'letter-combinations',
    title: 'Tổ Hợp Chữ Cái Từ Bàn Phím Điện Thoại',
    description: 'Cho chuỗi `digits` chứa các chữ số từ 2-9. Trả về tất cả tổ hợp chữ cái có thể tạo ra (giống bàn phím điện thoại cũ). Ví dụ: 2="abc", 3="def", 4="ghi", 5="jkl", 6="mno", 7="pqrs", 8="tuv", 9="wxyz".',
    difficulty: 'medium',
    tags: ['chuỗi', 'backtracking', 'đệ-quy'],
    acceptanceRate: 48,
    xp: 30,
    starterCode: `def letter_combinations(digits):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'digits = "23"', expectedOutput: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', isHidden: false },
      { input: 'digits = ""', expectedOutput: '[]', isHidden: false },
      { input: 'digits = "2"', expectedOutput: '["a","b","c"]', isHidden: true },
    ],
    hints: [
      'Tạo mapping từ chữ số sang chữ cái.',
      'Dùng backtracking: với mỗi chữ số, thử tất cả chữ cái tương ứng.',
    ],
    editorial: {
      approach: 'Backtracking: duyệt từng chữ số, thử mọi chữ cái tương ứng.',
      code: `def letter_combinations(digits):
    if not digits:
        return []
    phone = {'2':'abc','3':'def','4':'ghi','5':'jkl',
             '6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
    result = []
    def backtrack(index, current):
        if index == len(digits):
            result.append(current)
            return
        for char in phone[digits[index]]:
            backtrack(index + 1, current + char)
    backtrack(0, '')
    return result`,
      complexity: 'Thời gian: O(4^n), Không gian: O(n)',
    },
  },
  // ==================== HARD (191-200) ====================
  {
    id: 191,
    slug: 'climbing-stairs',
    title: 'Leo Cầu Thang',
    description: 'Bạn đang leo cầu thang có `n` bậc. Mỗi lần bạn có thể bước 1 hoặc 2 bậc. Hỏi có bao nhiêu cách khác nhau để leo lên đỉnh?',
    difficulty: 'hard',
    tags: ['quy-hoạch-động', 'toán'],
    acceptanceRate: 55,
    xp: 40,
    starterCode: `def climb_stairs(n):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'n = 2', expectedOutput: '2', isHidden: false },
      { input: 'n = 3', expectedOutput: '3', isHidden: false },
      { input: 'n = 5', expectedOutput: '8', isHidden: true },
      { input: 'n = 10', expectedOutput: '89', isHidden: true },
    ],
    hints: [
      'Số cách leo n bậc = số cách leo (n-1) bậc + số cách leo (n-2) bậc.',
      'Đây chính là dãy Fibonacci!',
    ],
    editorial: {
      approach: 'DP: dp[i] = dp[i-1] + dp[i-2], tương tự Fibonacci.',
      code: `def climb_stairs(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    return prev1`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 192,
    slug: 'house-robber',
    title: 'Trộm Nhà',
    description: 'Bạn là tên trộm. Các ngôi nhà xếp thành hàng, mỗi nhà có số tiền `nums[i]`. Không được trộm hai nhà liền kề. Tìm số tiền lớn nhất có thể trộm.',
    difficulty: 'hard',
    tags: ['quy-hoạch-động', 'mảng'],
    acceptanceRate: 50,
    xp: 40,
    starterCode: `def rob(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3, 1]', expectedOutput: '4', isHidden: false },
      { input: 'nums = [2, 7, 9, 3, 1]', expectedOutput: '12', isHidden: false },
      { input: 'nums = [2, 1, 1, 2]', expectedOutput: '4', isHidden: true },
    ],
    hints: [
      'dp[i] = max tiền trộm được từ nhà 0 đến nhà i.',
      'dp[i] = max(dp[i-1], dp[i-2] + nums[i]): bỏ qua nhà i hoặc trộm nhà i.',
    ],
    editorial: {
      approach: 'DP: tại mỗi nhà, chọn max giữa bỏ qua (lấy kết quả trước) hoặc trộm (cộng nhà i với kết quả cách 2 nhà).',
      code: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    prev2, prev1 = 0, 0
    for num in nums:
        current = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = current
    return prev1`,
      complexity: 'Thời gian: O(n), Không gian: O(1)',
    },
  },
  {
    id: 193,
    slug: 'longest-increasing-subsequence',
    title: 'Dãy Con Tăng Dài Nhất',
    description: 'Cho mảng số nguyên `nums`. Tìm độ dài dãy con tăng nghiêm ngặt dài nhất (không cần liên tiếp).',
    difficulty: 'hard',
    tags: ['quy-hoạch-động', 'tìm-kiếm-nhị-phân'],
    acceptanceRate: 38,
    xp: 50,
    starterCode: `def length_of_lis(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', expectedOutput: '4', isHidden: false },
      { input: 'nums = [0, 1, 0, 3, 2, 3]', expectedOutput: '4', isHidden: false },
      { input: 'nums = [7, 7, 7, 7, 7]', expectedOutput: '1', isHidden: true },
    ],
    hints: [
      'DP: dp[i] = độ dài LIS kết thúc tại i.',
      'dp[i] = max(dp[j] + 1) với mọi j < i mà nums[j] < nums[i].',
    ],
    editorial: {
      approach: 'DP O(n²): với mỗi phần tử, tìm LIS dài nhất kết thúc trước nó.',
      code: `def length_of_lis(nums):
    if not nums:
        return 0
    n = len(nums)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
      complexity: 'Thời gian: O(n²), Không gian: O(n)',
    },
  },
  {
    id: 194,
    slug: 'edit-distance',
    title: 'Khoảng Cách Chỉnh Sửa',
    description: 'Cho hai chuỗi `word1` và `word2`. Tìm số thao tác ít nhất (chèn, xóa, thay thế một ký tự) để biến word1 thành word2.',
    difficulty: 'hard',
    tags: ['quy-hoạch-động', 'chuỗi'],
    acceptanceRate: 35,
    xp: 50,
    starterCode: `def min_distance(word1, word2):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'word1 = "horse", word2 = "ros"', expectedOutput: '3', isHidden: false },
      { input: 'word1 = "intention", word2 = "execution"', expectedOutput: '5', isHidden: false },
      { input: 'word1 = "", word2 = "abc"', expectedOutput: '3', isHidden: true },
    ],
    hints: [
      'Dùng DP 2 chiều: dp[i][j] = số thao tác biến word1[:i] thành word2[:j].',
      'Nếu ký tự cuối giống nhau: dp[i][j] = dp[i-1][j-1]. Ngược lại: min(chèn, xóa, thay) + 1.',
    ],
    editorial: {
      approach: 'DP 2D: xây bảng dp[i][j] với 3 thao tác: chèn, xóa, thay thế.',
      code: `def min_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,
      complexity: 'Thời gian: O(m*n), Không gian: O(m*n)',
    },
  },
  {
    id: 195,
    slug: 'knapsack-01',
    title: 'Bài Toán Cái Túi 0/1',
    description: 'Cho `n` vật phẩm, mỗi vật có trọng lượng `weights[i]` và giá trị `values[i]`. Túi chứa tối đa `capacity` trọng lượng. Tìm giá trị lớn nhất có thể mang (mỗi vật chỉ lấy hoặc không lấy).',
    difficulty: 'hard',
    tags: ['quy-hoạch-động'],
    acceptanceRate: 38,
    xp: 50,
    starterCode: `def knapsack(weights, values, capacity):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'weights = [1, 3, 4, 5], values = [1, 4, 5, 7], capacity = 7', expectedOutput: '9', isHidden: false },
      { input: 'weights = [2, 3, 4], values = [3, 4, 5], capacity = 5', expectedOutput: '7', isHidden: false },
      { input: 'weights = [1, 2, 3], values = [6, 10, 12], capacity = 5', expectedOutput: '22', isHidden: true },
    ],
    hints: [
      'dp[i][w] = giá trị max khi xét i vật đầu với sức chứa w.',
      'Với mỗi vật: lấy (dp[i-1][w-weight] + value) hoặc không lấy (dp[i-1][w]).',
    ],
    editorial: {
      approach: 'DP 2D: xét từng vật phẩm, với mỗi sức chứa chọn lấy hoặc bỏ.',
      code: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]`,
      complexity: 'Thời gian: O(n * capacity), Không gian: O(n * capacity)',
    },
  },
  {
    id: 196,
    slug: 'permutations',
    title: 'Hoán Vị',
    description: 'Cho mảng số nguyên `nums` gồm các phần tử phân biệt. Trả về tất cả các hoán vị có thể.',
    difficulty: 'hard',
    tags: ['backtracking', 'đệ-quy'],
    acceptanceRate: 45,
    xp: 40,
    starterCode: `def permute(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3]', expectedOutput: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', isHidden: false },
      { input: 'nums = [0, 1]', expectedOutput: '[[0,1],[1,0]]', isHidden: false },
      { input: 'nums = [1]', expectedOutput: '[[1]]', isHidden: true },
    ],
    hints: [
      'Dùng backtracking: chọn từng phần tử chưa dùng vào vị trí hiện tại.',
      'Dùng mảng visited hoặc swap để đánh dấu phần tử đã chọn.',
    ],
    editorial: {
      approach: 'Backtracking: thử từng phần tử chưa dùng, đệ quy cho vị trí tiếp theo.',
      code: `def permute(nums):
    result = []
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()
    backtrack([], nums)
    return result`,
      complexity: 'Thời gian: O(n! * n), Không gian: O(n)',
    },
  },
  {
    id: 197,
    slug: 'subsets',
    title: 'Tập Con',
    description: 'Cho mảng số nguyên `nums` gồm các phần tử phân biệt. Trả về tất cả các tập con (power set).',
    difficulty: 'hard',
    tags: ['backtracking', 'đệ-quy', 'bit-manipulation'],
    acceptanceRate: 48,
    xp: 40,
    starterCode: `def subsets(nums):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'nums = [1, 2, 3]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', isHidden: false },
      { input: 'nums = [0]', expectedOutput: '[[],[0]]', isHidden: false },
      { input: 'nums = [1, 2]', expectedOutput: '[[],[1],[2],[1,2]]', isHidden: true },
    ],
    hints: [
      'Mỗi phần tử có 2 lựa chọn: có hoặc không có trong tập con.',
      'Dùng backtracking: tại mỗi bước, chọn thêm phần tử hoặc bỏ qua.',
    ],
    editorial: {
      approach: 'Backtracking: tại mỗi index, chọn thêm nums[index] hoặc bỏ qua.',
      code: `def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return result`,
      complexity: 'Thời gian: O(2^n), Không gian: O(n)',
    },
  },
  {
    id: 198,
    slug: 'word-search',
    title: 'Tìm Từ Trong Lưới',
    description: 'Cho lưới ký tự `board` (m x n) và chuỗi `word`. Kiểm tra xem `word` có thể được tạo thành bằng cách đi qua các ô liền kề (ngang/dọc) mà không dùng lại ô nào.',
    difficulty: 'hard',
    tags: ['backtracking', 'ma-trận', 'DFS'],
    acceptanceRate: 35,
    xp: 50,
    starterCode: `def exist(board, word):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expectedOutput: 'True', isHidden: false },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', expectedOutput: 'True', isHidden: false },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', expectedOutput: 'False', isHidden: true },
    ],
    hints: [
      'Dùng DFS/backtracking từ mỗi ô có ký tự đầu tiên của word.',
      'Đánh dấu ô đã thăm, quay lui khi không tìm được.',
    ],
    editorial: {
      approach: 'DFS + backtracking: thử từ mỗi ô, đánh dấu visited, quay lui.',
      code: `def exist(board, word):
    rows, cols = len(board), len(board[0])
    def dfs(r, c, idx):
        if idx == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[idx]:
            return False
        temp = board[r][c]
        board[r][c] = '#'
        found = (dfs(r+1,c,idx+1) or dfs(r-1,c,idx+1) or
                 dfs(r,c+1,idx+1) or dfs(r,c-1,idx+1))
        board[r][c] = temp
        return found
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
      complexity: 'Thời gian: O(m * n * 4^L) với L là độ dài word, Không gian: O(L)',
    },
  },
  {
    id: 199,
    slug: 'number-of-islands',
    title: 'Số Lượng Đảo',
    description: 'Cho lưới `grid` (m x n) gồm "1" (đất) và "0" (nước). Đếm số lượng đảo. Đảo là vùng đất liền kề (ngang/dọc) được bao quanh bởi nước.',
    difficulty: 'hard',
    tags: ['BFS', 'DFS', 'ma-trận'],
    acceptanceRate: 40,
    xp: 50,
    starterCode: `def num_islands(grid):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1', isHidden: false },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3', isHidden: false },
      { input: 'grid = [["1","0","1"],["0","1","0"],["1","0","1"]]', expectedOutput: '5', isHidden: true },
    ],
    hints: [
      'Duyệt lưới, khi gặp "1" thì đếm 1 đảo và dùng BFS/DFS đánh dấu toàn bộ đảo đó.',
      'Đánh dấu ô đã thăm bằng cách đổi "1" thành "0".',
    ],
    editorial: {
      approach: 'BFS/DFS: duyệt lưới, khi gặp đất thì flood-fill đánh dấu toàn bộ đảo.',
      code: `def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def bfs(r, c):
        queue = [(r, c)]
        grid[r][c] = '0'
        while queue:
            row, col = queue.pop(0)
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = row + dr, col + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    grid[nr][nc] = '0'
                    queue.append((nr, nc))
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                bfs(r, c)
                count += 1
    return count`,
      complexity: 'Thời gian: O(m * n), Không gian: O(m * n)',
    },
  },
  {
    id: 200,
    slug: 'course-schedule',
    title: 'Lịch Học (Sắp Xếp Topo)',
    description: 'Có `numCourses` môn học (0 đến numCourses-1). Mảng `prerequisites` cho biết [a, b] nghĩa là phải học b trước a. Kiểm tra xem có thể hoàn thành tất cả môn học không (không có vòng lặp phụ thuộc).',
    difficulty: 'hard',
    tags: ['đồ-thị', 'BFS', 'sắp-xếp-topo'],
    acceptanceRate: 38,
    xp: 50,
    starterCode: `def can_finish(numCourses, prerequisites):
    # Viết code của bạn ở đây
    pass`,
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expectedOutput: 'True', isHidden: false },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expectedOutput: 'False', isHidden: false },
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]', expectedOutput: 'True', isHidden: true },
      { input: 'numCourses = 3, prerequisites = [[0,1],[1,2],[2,0]]', expectedOutput: 'False', isHidden: true },
    ],
    hints: [
      'Xây đồ thị có hướng và tính bậc vào (in-degree) mỗi đỉnh.',
      'Dùng BFS (Kahn algorithm): bắt đầu từ đỉnh có bậc vào = 0.',
      'Nếu số đỉnh đã xử lý < numCourses thì có chu trình.',
    ],
    editorial: {
      approach: 'Topological sort (Kahn): BFS từ đỉnh bậc vào 0, kiểm tra xử lý hết tất cả.',
      code: `def can_finish(numCourses, prerequisites):
    from collections import deque
    graph = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    for a, b in prerequisites:
        graph[b].append(a)
        in_degree[a] += 1
    queue = deque()
    for i in range(numCourses):
        if in_degree[i] == 0:
            queue.append(i)
    count = 0
    while queue:
        node = queue.popleft()
        count += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return count == numCourses`,
      complexity: 'Thời gian: O(V + E), Không gian: O(V + E)',
    },
  },
];
