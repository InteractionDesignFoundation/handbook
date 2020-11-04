# SOLID Principles and PHP

Five agile principles that should guide you every time you write code.
And I’ll show you how to apply them with PHP.
I’ll try to be the most practical as possible, and providing examples for each casuistic.

1. **S-RP**: Single Responsibility Principle
1. **O-CP**: Open Closed Principle
1. **L-SP**: Liskov Substitution Principle
1. **I-SP**: Interface Segregation Principle
1. **D-IP**: Dependency Inversion Principle

## Single Responsibility Principle

> A class should have one, and only one, reason to change.

**This principle is about actors and high level architecture**.
It specifies that a class (or method) must have a specific purpose, ie, a unique responsibility or a reason to change.

### Example

Imagine that we have an interface for reports like this one:

```php
interface Report
{
    public function getTitle();
    public function getDate();
    public function getHeaders();
    public function getBody();
    public function toCSV();
    public function toHTML($name);
}
```

This interface has two overlapped responsibilities coexisting here: get data and format it.
What if product owner will ask you to support to formats: XML, JSON, PDF?

This issue could be solved by using two interfaces: `Report` and `ReportFormatter`.

```php
interface Report
{
    public function getTitle();
    public function getDate();
    public function getHeaders();
    public function getBody();
}

interface ReportFormatter
{
    public function format(Report $report);
}

class HtmlReportFormatter implements ReportFormatter
{
    public function format()
    {
        $output = '';
        // ...

        return $output;
    }
}
```

### Conclusion

This principle is often ignored for reasons of practicality and ease of development,
but if you work on large-scale projects, it’s extremely important to respect the pillars of good OOP design,
or we will lose the battle against complexity.

## Open Closed Principle

> You should be able to extend a classes behavior, without modifying it.

**This principle is about class design and feature extensions**, it based on delegating responsibility to the class.
If we have actions that depend on the subtype of a class, it is easier to provide that feature in the parent class,
and then the subclasses can (re)implement that feature.

### Example

Let’s see it clearer with the example.

Imagine we have a Board class that contains Rectangles and can calculate the area of the Rectangles.

```php
class Rectangle
{
    public $width;
    public $height;
}

class Board
{
    public $rectangles = [];

    // ...

    public function calculateArea()
    {
        $area = 0;
        foreach ($this->rectangles as $rectangle) {
            $area += $rectangle->width * $rectangle->height;
        }

        return $area;
    }
}
```

But now, our client needs to add circles to the board.

We have to make our Board to know about Rectangles and Circles,
but if we would respect OCP, we should not need to touch Board or Rectangle.
We should reuse the existing Board and apply it to Circle.

```php
interface Shape
{
    public function area();
}

class Rectangle implements Shape
{
    // ...

    public function area()
    {
        return $this->width * $this->height;
    }
}

class Circle implements Shape
{
    // ...

    public function area()
    {
        return $this->radius * $this->radius * pi();
    }
}

class Board
{
    public $shapes = [];

    // ...

    public function calculateArea()
    {
        $area = 0;
        foreach ($this->shapes as $shape) {
            $area+= $shape->area();
        }

        return $area;
    }
}
```

### Conclusion

**Abstraction is a key**. In many ways this principle is at the heart of object oriented design.

This is what [Robert Martin wrote](https://blog.8thlight.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html) about OCP:

> I’ve heard it said that the OCP is wrong, unworkable, impractical, and not for real programmers with real work to do.
> The rise of plugin architectures makes it plain that these views are utter nonsense.
> On the contrary, a strong plugin architecture is likely to be the most important aspect of future software systems.

## Liskov Substitution Principle

> Derived classes must be substitutable for their base classes.

This principle says that every class that inherit from a parent class, must not replicate functionality already implemented in the parent class.
Then the parent class should be able to be replaced by any of its subclasses in any region of the code.

In this case, we have our class Rectangle, and now we want to create a class Square that extends from Rectangle.

```php
class Rectangle
{
    protected int $height;
    protected int $width;

    public function setWidth($w) { $this->width = $w; }
    public function setHeight($h) { $this->height = $h; }
    public function getArea() { return $this->height * $this->width; }
}

class Square extends Rectangle
{
    public function setWidth($w) { $this->width = $w; $this->height = $w; }
    public function setHeight($h) { $this->height = $h; $this->width = $h; }
}
```

and we create our function to calculate classes :

```php
function areaOfRectangle() {
    $rectangle = new Rectangle();
    $rectangle->setWidth(7);
    $rectangle->setHeight(3);
    $rectangle->getArea(); // 21
}
```

as the LSP says, we should be able to change Rectangle by Square

```php
function areaOfRectangle() {
    $rectangle = new Square();
    $rectangle->setWidth(7);
    $rectangle->setHeight(3);
    $rectangle->getArea(); // 9
}
```

Remember what we said: “we must make sure that Square classes are extending the Rectangle without changing their behaviour”. But, as you can see, 21 is not equal to 9.

The solution would be to manage the class inheritance hierarchies correctly, for example by introducing the interface `Quadrilateral`.

```php
interface Quadrilateral
{
    public function setHeight($h);
    public function setWidth($w);
    public function getArea();
}

class Rectangle implements Quadrilateral {}

class Square implements Quadrilateral {}
```

### Conclusion

Following the Liskov Substitution Principle is a good indicator that you are following a correctly hierarchy schema.
And if you don’t follow it, the unit tests for the superclass would never succeed for the subclasses.

## Interface Segregation Principle

> Make fine grained interfaces that are client specific.

This principle proposes to divide interfaces so they are more specific.
A class can implement multiple interfaces simultaneously, we shouldn’t force clients to deploy methods unnecessary.

Let’s think about a digital agency that has workers, so I create the interface Worker

```php
interface Worker {
    public function takeBreak();
    public function code();
    public function callToClient();
    public function attendMeetings();
    public function getPaid();
}
```

but for example, if we create the class `Manager` and the class `Developer` we are going to have problems with unused methods:

```php
class Manager implements Worker
{
    public function code() { return false; }
}

class Developer implements Worker
{
    public function callToClient() { echo $swearWord; }
}
```

Then we should create more interfaces.

```php
interface Worker
{
    public function takeBreak();
    public function getPaid();
}

interface Coder {
    public function code();
}

interface ClientFacer {
    public function callToClient();
    public function attendMeetings();
}

class Developer implements Worker, Coder {}

class Manager implements Worker, ClientFacer {}
```

### Conclusion

The conclusion here is simple, we can end up with a "fat" class with multitudes of methods specific to a variety of different features.
A system may become so coupled at multiple levels that it is no longer possible to make a change in one place without necessitating many additional changes.

## Dependency Inversion Principle

> Depend on abstractions, not on concretions.

This is one the most important SOLID principles if you follow TDD.
It refers to a specific form of decoupling software modules.
So, if a class uses other classes, the initialization of the objects has to come from outside.

As this principle could be difficult to understand, lets review what the principle states:

> High level modules should not depend on low-level modules, both should depend on abstractions.
> Abstractions should not depend on details. Details should depend on abstractions.

Then, this principle inverts the way some people may think about OOP, dictating that both classes and subclasses must depend on the same abstraction.

In this case, I’m going to use the Worker example that we used in the previous principle.

We have the Manager class, which is the high level class, and then a class called Worker.
The Manager can make Workers to work. Let’s see a traditional OO implementation:

```php
// Bad example
class Worker
{
    public function work() {}
}

class Manager
{
    private $worker;

    public function setWorker(Worker $w)
    {
        $this->worker = $w;
    }

    public function manage()
    {
        $this->worker->work();
    }
}
```

Now, we need to add a new kind of specialized workers, we create a new class SpecializedWorker for this.

```php
// Bad example
class SpecializedWorker
{
    public function work() {}
}
```

Now see the cons:

**We have to modify the Manager class, and some of the functionality of the Manager might be affected.
The unit tests should be redone.**

If we would have follow the D-IP, we wouldn’t have had these problems.

```php
// Good example

interface Employee
{
    public function work();
}

class Worker implements Employee
{
    public function work() {}
}

class SpecializedWorker implements Employee
{
    public function work() {}
}
```

### Conclusion

The principle of dependency inversion is critically important for the construction of code that is resilient to change.

## Final Thoughts

Using the SOLID principles implies an increased effort.
It will result in more classes and interfaces to maintain.
More complex but more flexible code.
These principles will make our code better and our life as programmers much easier.
Well designed code is easier for programmers to understand.
A lot of these SOLID principles seem to fall out fairly naturally if you practice TDD (or BDD).

But remember the KISS (Keep It Simple, Stupid), and DRY (Don’t Repeat Yourself) principles. I believe there are no perfect designs, just trade offs, and the SOLID principles can help you evaluate these and achieve a good balance.

## Recommended reading

-   [PrinciplesOfOod by Uncle Bob](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
-   [Agile Software Development, Principles, Patterns, and Practices](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445/ref=sr_1_4?s=books&ie=UTF8&qid=1449575781&sr=1-4&keywords=solid+principles) Book by Robert C. Martin.

PS: This page is based on [this article](https://jokiruiz.com/software/solid-principles-php/).
